import sqlite3

sql_statements = [
    """CREATE TABLE IF NOT EXISTS task (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	nome text NOT NULL,
	descricao text NOT NULL,
    conluido INTERGER NOT NULL DEFAULT 0
);"""
]

try:
    with sqlite3.connect('dados.db') as conn:
        # interact with database
        cursor = conn.cursor()

    for statement in sql_statements:
        cursor.execute(statement)

        conn.commit()

        print(f"Tabela 'task' criada")
except sqlite3.OperationalError as e:
    print("Failed to create tables:", e)