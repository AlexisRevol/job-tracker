def test_add_candidature(client, auth_headers):
    payload = {
        "entreprise": "TestCorp",
        "poste": "Testeur",
        "date_candidature": "2025-05-20",
        "statut": "envoyée",
        "commentaire": "Test unitaire",
    }

    response = client.post("/candidatures/", json=payload, headers=auth_headers)

    assert response.status_code == 200
    data = response.json()
    assert data["entreprise"] == "TestCorp"
    assert data["poste"] == "Testeur"
    assert data["statut"] == "envoyée"
    assert data["commentaire"] == "Test unitaire"
    assert "id" in data
