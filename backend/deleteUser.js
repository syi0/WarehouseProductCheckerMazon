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
    const username = await ask("Podaj login użytkownika do usunięcia: ");
    const password1 = await ask("Podaj hasło użytkownika: ");
    const password2 = await ask("Powtórz hasło: ");

    if (password1 !== password2) {
        console.log("❌ Hasła się nie zgadzają. Przerwano operację.");
        rl.close();
        return;
    }

    const db = new sqlite3.Database('./data.sqlite', (err) => {
        if (err) {
            console.error("Błąd połączenia z bazą:", err.message);
            process.exit(1);
        }
    });

    db.get(
        "SELECT * FROM login WHERE username = ? AND password = ?",
        [username, password1],
        (err, row) => {
            if (err) {
                console.error("Błąd podczas wyszukiwania użytkownika:", err.message);
                db.close();
                rl.close();
                return;
            }

            if (!row) {
                console.log("❌ Użytkownik nie istnieje lub błędne hasło.");
                db.close();
                rl.close();
                return;
            }

            db.run(
                "DELETE FROM login WHERE username = ?",
                [username],
                function (err) {
                    if (err) {
                        console.error("Błąd przy usuwaniu użytkownika:", err.message);
                    } else {
                        console.log(`✅ Użytkownik "${username}" został usunięty.`);
                    }
                    db.close();
                    rl.close();
                }
            );
        }
    );
}

main();
