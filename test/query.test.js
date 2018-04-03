import test from 'ava';
import micro from 'micro';
import listen from 'test-listen';
import request from 'request-promise';
import routes from '../dist/index';

test('GraphQL book authors', async (t) => {
    const service = micro(routes);
    const url = await listen(service);
    const options = {
        method: 'POST',
        uri: url + '/graphql',
        body: {'query': '{ books { author }}'},
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    const body = await request(options);
    t.deepEqual(body.data.books[0].author, 'J.K. Rowling');
    t.deepEqual(body.data.books[1].author, 'Michael Crichton');
    service.close();
});

test('GraphQL book titles', async (t) => {
    const service = micro(routes);
    const url = await listen(service);
    const options = {
        method: 'POST',
        uri: url + '/graphql',
        body: {'query': '{ books { title }}'},
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    const body = await request(options);
    t.deepEqual(body.data.books[0].title,
        'Harry Potter and the Sorcerer\'s stone');
    t.deepEqual(body.data.books[1].title, 'Jurassic Park');
    service.close();
});
