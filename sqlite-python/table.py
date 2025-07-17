import sqlite3

database = 'dados.db'
sql_statements = [
    """CREATE TABLE IF NOT EXISTS task (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	nome text NOT NULL,
	descricao text NOT NULL
);"""
]

try:
    with sqlite3.connect(database) as conn:
        # interact with database
        cursor = conn.cursor()

    for statement in sql_statements:
        cursor.execute(statement)

        conn.commit()

        print(f"Tabela 'task' criada em {database}")
except sqlite3.OperationalError as e:
    print("Failed to create tables:", e)