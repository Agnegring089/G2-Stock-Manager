BEGIN;

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    login VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf CHAR(11) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cargo VARCHAR(255) CHECK (cargo IN ('adm', 'func', 'estag'))
);

CREATE TABLE materiais (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) CHECK (type IN ('limpeza', 'tecnologia', 'infraestrutura', 'outros')),
    quantity INTEGER CHECK (quantity >= 0),
    last_mov DATE
);

CREATE TABLE movimentacoes (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    data_mov DATE NOT NULL,
    descricao TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

CREATE TABLE movimentacao_materiais (
    movimentacao_id INT NOT NULL,
    material_id INT NOT NULL,
    quantidade INT CHECK (quantidade > 0),
    FOREIGN KEY (movimentacao_id) REFERENCES movimentacoes(id) ON DELETE CASCADE,
    FOREIGN KEY (material_id) REFERENCES materiais(id),
    PRIMARY KEY (movimentacao_id, material_id)
);

COMMIT;
