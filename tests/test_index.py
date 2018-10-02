import pytest

from app import app


@pytest.fixture
def client():
    app.config["TESTING"] = True
    client = app.test_client()
    yield client


def test_index(client):
    """ Ensure flask was set up correctly. """
    response = client.get('/', content_type='html/text')
    assert response.status_code == 200


def test_index_slightly_better(client):
    """ Ensure '/' contains expected HTML. """
    response = client.get('/', content_type='html/text')
    assert "<title>Flask Stock Visualizer</title>" in response.data
