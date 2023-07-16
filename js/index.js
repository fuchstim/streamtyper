function onBodyLoad() {
  const input = getInput();

  input.addEventListener('blur', function(event) {
    const scrollLeft = event.target.scrollLeft;

    window.setTimeout(function () {
      event.target.scrollLeft = scrollLeft;
    }, 0);
  }, false);

  input.addEventListener('keydown', function(event) {
    if(['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(event.key)) {
      event.preventDefault();

      return false;
    }

    if([37, 38, 39, 40].includes(event.keyCode)) {
      event.preventDefault();

      return false;
    }
  });

  document.addEventListener('keydown', event => {
    if(event.key !== 's' && event.keyCode !== 83) { return; }

    if(!event.ctrlKey && !event.metaKey) { return; }

    event.preventDefault();
    
    save();
  });
}

function focusInput() {
  const input = getInput();

  input.setSelectionRange(input.value.length, input.value.length);
  input.focus();
  input.scroll(0, 1000)
}

function handleGlobalClick() {
  focusInput()
}

function getInput() {
  return document.getElementById('inputText');
}

function save() {
  const content = getInput().value;
  if(!content.length) { return; }

  const link = document.createElement("a");
  const file = new Blob([content], { type: 'text/plain' });
  link.href = URL.createObjectURL(file);
  link.download = "content.txt";
  link.click();
  URL.revokeObjectURL(link.href);
}
