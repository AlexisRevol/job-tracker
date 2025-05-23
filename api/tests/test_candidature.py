from tests.conftest import create_fake_user


def test_add_candidature(client, db_session):
    create_fake_user(db_session)

    payload = {
        "entreprise": "TestCorp",
        "poste": "Testeur",
        "date_candidature": "2025-05-20",
        "statut": "envoyée",
        "commentaire": "Test unitaire",
    }

    response = client.post("/candidatures/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["entreprise"] == "TestCorp"
    assert data["poste"] == "Testeur"
    assert data["statut"] == "envoyée"
    assert data["commentaire"] == "Test unitaire"
    assert "id" in data
