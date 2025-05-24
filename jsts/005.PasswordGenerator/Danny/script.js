const passwordGeneratorModel = {
  type: 'r',

  random: {
    charactersMin: 8,
    charactersMax: 100,
    characters: 20,
    numbers: false,
    symbols: false,
  },

  memorable: {
    charactersMin: 3,
    charactersMax: 15,
    characters: 4,
    capitalize: false,
    fullWords: true,
  },

  pin: {
    charactersMin: 3,
    charactersMax: 12,
    characters: 6,
  },

  password: '',

  updateUI: function () {
    const characters = document.querySelector('#characters');
    const charactersNumber = document.querySelector('#charactersNumber');
    const randomOptions = document.querySelector('#randomOptions');
    const memorableOptions = document.querySelector('#memorableOptions');

    this.generatePassword();
    const passwordDisplay = document.querySelector('#passwordDisplay');
    passwordDisplay.textContent = this.password;

    if (this.type === 'r') {
      randomOptions.style.display = 'block';
      memorableOptions.style.display = 'none';
      // set characters min and max and valut to random value
      characters.min = this.random.charactersMin;
      characters.max = this.random.charactersMax;
      characters.value = this.random.characters;
      // set chatersNumber min and max and value to random value
      charactersNumber.min = this.random.charactersMin;
      charactersNumber.max = this.random.charactersMax;
      charactersNumber.value = this.random.characters;
    } else if (this.type === 'm') {
      randomOptions.style.display = 'none';
      memorableOptions.style.display = 'block';
      // set characters min and max and value to random value
      characters.min = this.memorable.charactersMin;
      characters.max = this.memorable.charactersMax;
      characters.value = this.memorable.characters;
      // set charactersNumber min and max and value to random value
      charactersNumber.min = this.memorable.charactersMin;
      charactersNumber.max = this.memorable.charactersMax;
      charactersNumber.value = this.memorable.characters;
    } else if (this.type === 'p') {
      randomOptions.style.display = 'none';
      memorableOptions.style.display = 'none';
      // set characters min and max and value to random value
      characters.min = this.pin.charactersMin;
      characters.max = this.pin.charactersMax;
      characters.value = this.pin.characters;
      // set charactersNumber min and max and value to random value
      charactersNumber.min = this.pin.charactersMin;
      charactersNumber.max = this.pin.charactersMax;
      charactersNumber.value = this.pin.characters;
    }
  },

  generatePassword: function () {
    if (this.type === 'r') {
      this.password = this.generateRandomPassword();
    } else if (this.type === 'm') {
      this.password = this.generateMemorablePassword();
    } else if (this.type === 'p') {
      this.password = this.generatePin();
    }
  },

  generateRandomPassword: function () {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
    let temppassword = '';
    const passwordLength = this.random.characters;
    const useNumbers = this.random.numbers;
    const useSymbols = this.random.symbols;
    const allCharacters =
      characters + (useNumbers ? numbers : '') + (useSymbols ? symbols : '');
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * allCharacters.length);
      temppassword += allCharacters[randomIndex];
    }
    return temppassword;
  },

  generatePin: function () {
    const numbers = '0123456789';
    let temppassword = '';
    const passwordLength = this.pin.characters;
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      temppassword += numbers[randomIndex];
    }
    return temppassword;
  },
};

const passwordGeneratorController = {
  setNumbers: function (numbers) {
    passwordGeneratorModel.random.numbers = numbers.checked;
    passwordGeneratorModel.updateUI();
  },

  setType: function (type) {
    passwordGeneratorModel.type = type;
    passwordGeneratorModel.updateUI();
  },

  setCharacters: function (characters) {
    if (passwordGeneratorModel.type === 'r') {
      passwordGeneratorModel.random.characters = characters;
    } else if (passwordGeneratorModel.type === 'm') {
      passwordGeneratorModel.memorable.characters = characters;
    } else if (passwordGeneratorModel.type === 'p') {
      passwordGeneratorModel.pin.characters = characters;
    }
    passwordGeneratorModel.updateUI();
  },
};

passwordGeneratorModel.updateUI();
