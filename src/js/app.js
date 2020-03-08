const printHelloWorld = () => {
  return 'Hello world!';
};

const app = document.getElementById('app');
const headerTitle = document.getElementById('title');

app.style.padding = '50px';
headerTitle.innerHTML = printHelloWorld();
