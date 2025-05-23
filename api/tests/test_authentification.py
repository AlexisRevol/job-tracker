def test_register_user(client):
    response = client.post(
        "/auth/register", json={"email": "test@example.com", "password": "testpassword"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data


def test_login_user(client):
    # D'abord enregistrer un utilisateur
    client.post(
        "/auth/register", json={"email": "login@example.com", "password": "password123"}
    )

    # Puis tenter de se connecter
    response = client.post(
        "/auth/login", data={"username": "login@example.com", "password": "password123"}
    )

    assert response.status_code == 200
    token_data = response.json()
    assert "access_token" in token_data
    assert token_data["token_type"] == "bearer"


def test_login_nonexistent_user(client):
    response = client.post(
        "/auth/login",
        data={"username": "inconnu@example.com", "password": "nopassword"},
    )

    assert response.status_code == 401
