const inputElement = document.getElementById('member-pgp-key-lookup');
const resultElement = document.getElementById('member-pgp-key-result');
const keyCountElement = document.getElementById('total-member-pgp-keys');
const keyResultCountElement = document.getElementById('member-pgp-result-amount');

let jsonData = [];

function loadJSON(callback) {
  const xhr = new XMLHttpRequest();
  xhr.overrideMimeType('application/json');
  xhr.open('GET', 'media/pgpkeys.json', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      jsonData = JSON.parse(xhr.responseText);
      callback();
    }
  };
  xhr.send(null);
}

function formatPGPKeyBlock(pkb) {
  const maxLength = 64;
  const regex = new RegExp(`.{1,${maxLength}}`, 'g'); // splt every 64 characters

  pkb = pkb
    .trim()
    .replace('-----BEGIN PGP PUBLIC KEY BLOCK-----', '')
    .replace('-----END PGP PUBLIC KEY BLOCK-----', '');

  const lines = pkb.match(regex);

  lines.unshift('-----BEGIN PGP PUBLIC KEY BLOCK-----\n');
  lines.push('-----END PGP PUBLIC KEY BLOCK-----');
  return lines.join('\n');
}

inputElement.addEventListener('input', function () {
  const searchTerm = inputElement.value.toLowerCase().trim();
  resultElement.textContent = '';

  const filteredResults = jsonData.filter((item) => {
    keyCountElement.textContent = `(${jsonData.length} Total)`;
    
    return JSON.stringify(item).toLowerCase().includes(searchTerm);
  });

  keyResultCountElement.textContent = filteredResults.length;

  if (filteredResults.length > 0) {
    filteredResults.forEach((item) => {
      const keyBlock = formatPGPKeyBlock(item.key);
      resultElement.textContent += `Name......: ${item.name}\nIs Staff..? ${item.is_staff}\nDate Added: ${item.date_added}\nDetails...: ${item.details}\n\n${keyBlock}\n\n================================================================\n\n`;
    });
  } else {
    resultElement.textContent = 'No results found.';
  }
});

loadJSON(function () {
  inputElement.dispatchEvent(new Event('input'));
});