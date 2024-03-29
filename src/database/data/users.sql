TRUNCATE TABLE users CASCADE;

INSERT INTO
    users (
        user_id,
        user_first_name,
        user_last_name,
        user_email,
        user_password,
        user_age
    )
VALUES
    (
        '00000000-0000-0000-0001-000000000001',
        'John',
        'Doe',
        'john@example.com',
        '$2b$10$eQ6t6E5ppuFp9y/9GHem0u7JrMiQiOGToNxIUbIi9Y50vj6A6LVh2', -- Example hashed password
        30
    ),
    (
        '00000000-0000-0000-0001-000000000002',
        'Jane',
        'Smith',
        'jane@example.com',
        '$2b$10$eQ6t6E5ppuFp9y/9GHem0u7JrMiQiOGToNxIUbIi9Y50vj6A6LVh2', -- Example hashed password
        25
    ),
    (
        '00000000-0000-0000-0001-000000000003',
        'Alice',
        'Johnson',
        'alice@example.com',
        '$2b$10$eQ6t6E5ppuFp9y/9GHem0u7JrMiQiOGToNxIUbIi9Y50vj6A6LVh2', -- Example hashed password
        35
    ),
    (
        '00000000-0000-0000-0001-000000000004',
        'Bob',
        'Brown',
        'bob@example.com',
        '$2b$10$eQ6t6E5ppuFp9y/9GHem0u7JrMiQiOGToNxIUbIi9Y50vj6A6LVh2', -- Example hashed password
        40
    ),
    (
        '00000000-0000-0000-0001-000000000005',
        'Emily',
        'Davis',
        'emily@example.com',
        '$2b$10$eQ6t6E5ppuFp9y/9GHem0u7JrMiQiOGToNxIUbIi9Y50vj6A6LVh2', -- Example hashed password
        28
    );