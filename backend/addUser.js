const sqlite3 = require('sqlite3').verbose();
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => resolve(answer.trim()));
    });
};

async function main() {
    const username = await ask("Podaj nazwę użytkownika: ");
    const password = await ask("Podaj hasło: ");
    
    let role = '';
    while (role !== 'admin' && role !== 'warehouseman') {
        role = await ask("Podaj rolę (admin / warehouseman): ");
        if (role !== 'admin' && role !== 'warehouseman') {
            console.log("Niepoprawna rola. Spróbuj ponownie.");
        }
    }

    const db = new sqlite3.Database('./data.sqlite', (err) => {
        if (err) {
            console.error("Błąd połączenia z bazą:", err.message);
            process.exit(1);
        }
    });

    db.run(
        "INSERT INTO login (username, password, rola) VALUES (?, ?, ?)",
        [username, password, role],
        function (err) {
            if (err) {
                console.error("Błąd przy dodawaniu użytkownika:", err.message);
            } else {
                console.log(`✅ Użytkownik "${username}" dodany z rolą "${role}".`);
            }
            db.close();
            rl.close();
        }
    );
}

main();
