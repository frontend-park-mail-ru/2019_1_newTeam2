import {Link} from './components/Link/Link.js';
const application = document.getElementById('application');

function testComponents() {
    application.innerHTML = "";
    const testLink = new Link({
        parent: application,
        textContent: "This is Link?",
    });
    testLink.render();

    const th6 = new Link({
        parent: application,
        size: "h6",
        textContent: "this is h6",
    });
    th6.render();

    const th5 = new Link({
        parent: application,
        size: "h5",
        textContent: "this is h5",
    });
    th5.render();

    const th4 = new Link({
        parent: application,
        size: "h4",
        textContent: "this is h4",
    });
    th4.render();

    const th3 = new Link({
        parent: application,
        size: "h3",
        textContent: "this is h3",
    });
    th3.render();

    const th2 = new Link({
        parent: application,
        size: "h2",
        textContent: "this is h2",
    });
    th2.render();

    const th1 = new Link({
        parent: application,
        size: "h1",
        textContent: "this is h1",
    });
    th1.render();
}

testComponents();