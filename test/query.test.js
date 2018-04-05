import test from 'ava';
import micro from 'micro';
import listen from 'test-listen';
import request from 'request-promise';
import routes from '../dist/index';

test('author id 1 is J.K. Rowling', async (t) => {
    const service = micro(routes);
    const url = await listen(service);
    const options = {
        method: 'POST',
        uri: url + '/graphql',
        body: {'query': '{ author(id: 1) { firstName lastName} }'},
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    const body = await request(options);
    t.is(body.data.author.firstName, 'J.K.');
    t.is(body.data.author.lastName, 'Rowling');
    service.close();
});

test('author id 2 is Michael Crichton', async (t) => {
    const service = micro(routes);
    const url = await listen(service);
    const options = {
        method: 'POST',
        uri: url + '/graphql',
        body: {'query': '{ author(id: 2) { firstName lastName } }'},
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    const body = await request(options);
    t.is(body.data.author.firstName, 'Michael');
    t.is(body.data.author.lastName, 'Crichton');
    service.close();
});

test('book id 1 is titled "Harry Potter and the Sorcerer\'s stone"',
    async (t) => {
        const service = micro(routes);
        const url = await listen(service);
        const options = {
            method: 'POST',
            uri: url + '/graphql',
            body: {'query': '{ book(id: 1) { title } }'},
            json: true,
            headers: {'Content-Type': 'application/json'},
        };
        const body = await request(options);
        t.is(body.data.book.title, 'Harry Potter and the Sorcerer\'s stone');
        service.close();
});

test('book id 2 is titled "Jurassic Park"',
    async (t) => {
        const service = micro(routes);
        const url = await listen(service);
        const options = {
            method: 'POST',
            uri: url + '/graphql',
            body: {'query': '{ book(id: 2) { title } }'},
            json: true,
            headers: {'Content-Type': 'application/json'},
        };
        const body = await request(options);
        t.is(body.data.book.title, 'Jurassic Park');
        service.close();
});

test('titles of all books', async (t) => {
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

    t.is(body.data.books[0].title, 'Harry Potter and the Sorcerer\'s stone');
    t.is(body.data.books[1].title, 'Jurassic Park');
    service.close();
});

test('names of all Authors', async (t) => {
    const service = micro(routes);
    const url = await listen(service);
    const options = {
        method: 'POST',
        uri: url + '/graphql',
        body: {'query': '{ authors { firstName lastName }}'},
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    const body = await request(options);

    t.is(body.data.authors[0].firstName, 'J.K.');
    t.is(body.data.authors[0].lastName, 'Rowling');
    t.is(body.data.authors[1].firstName, 'Michael');
    t.is(body.data.authors[1].lastName, 'Crichton');
    service.close();
});

test('"Jurassic Park" is authored by Michael Crichton',
    async (t) => {
        const service = micro(routes);
        const url = await listen(service);
        const options = {
            method: 'POST',
            uri: url + '/graphql',
            body: {
                    'query': `{ 
                                book(title: "Jurassic Park") {
                                    author {
                                    firstName
                                    lastName
                                    }
                                }
                              }`,
            },
            json: true,
            headers: {'Content-Type': 'application/json'},
        };
        const body = await request(options);
        t.is(body.data.book.author.firstName, 'Michael');
        t.is(body.data.book.author.lastName, 'Crichton');
        service.close();
});

test('"Harry Potter and the Sorcerer\'s stone" is authored by J.K. Rowling',
    async (t) => {
        const service = micro(routes);
        const url = await listen(service);
        const options = {
            method: 'POST',
            uri: url + '/graphql',
            body: {
            'query': `{ 
                        book(title: "Harry Potter and the Sorcerer\'s stone") {
                            author {
                            firstName
                            lastName
                            }
                        }
                        }`,
            },
            json: true,
            headers: {'Content-Type': 'application/json'},
        };
        const body = await request(options);
        t.is(body.data.book.author.firstName, 'J.K.');
        t.is(body.data.book.author.lastName, 'Rowling');
        service.close();
});
