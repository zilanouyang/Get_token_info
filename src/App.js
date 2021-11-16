import logo from './logo.svg';
import './App.css';
import BlockchainClient from './blockchain/Blockchain';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useEffect, useState } from 'react';
function App() {
  const [addressInput, setAddressInput] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Ethereum', value: '1' },
    { name: 'Binance', value: '2' },
  ];
  const getTokenName = async () => {
    if(addressInput) {
      let chainType = radioValue == '1' ? 'ethereum' : 'binance';
      console.log(chainType)
      const token = new BlockchainClient(addressInput, chainType);
      let name = await token.getTokenName();
      console.log(name);
      setTokenName(name);
    }
    else {
      alert("Contract addres cannot be null");
    }
  };
  const handleContractAddressInput = (event) => {
    setAddressInput(event.target.value);
  }
  return (
    <div className="App">
      <div style={{ marginTop: '2%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-success' : 'outline-danger'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
        <input type="text" value={addressInput} onChange={handleContractAddressInput} style={{margin: 10}} />
        <Button variant="success" onClick={() => getTokenName()}>GET TOKEN NAME</Button>{' '}
        <div style={{margin: 10}}>Token Name: {tokenName}</div>
      </div>
    </div>
  );
}

export default App;
