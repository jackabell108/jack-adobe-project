import React from 'react';
import './App.css';

import {Button, Flex, defaultTheme, Heading, Provider, Text, TextField} from '@adobe/react-spectrum';
import { getRomanNumeral } from './romanNumeral';



function App() {
  const [untranslatedInteger, setUntranslatedInteger] = React.useState<number | undefined>();
  const [romanNumeral, setRomanNumeral] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const cleanInput = (uncleanedInteger: string | undefined) => {
    const value = parseInt(uncleanedInteger ?? "");
    if (!uncleanedInteger) {
      setErrorMessage("A value must be entered");
    }
    if (uncleanedInteger && !Number.isInteger(parseInt(uncleanedInteger))) {
      setErrorMessage("Value is not an integer :(")
      return;
    }
    if (value < 1 || value > 3999) {
      setErrorMessage("Value must be between 1 and 3999");
      return;
    }
    if (uncleanedInteger && Number.isInteger(parseInt(uncleanedInteger))) {
      setUntranslatedInteger(parseInt(uncleanedInteger))
      setErrorMessage("");
    }
  }

  const updateRomanNumeral = async (untranslatedInteger: number | undefined) => {
    if (!untranslatedInteger) {
      setErrorMessage("A value must be entered!");
      return;
    }
    const numeral = await getRomanNumeral(untranslatedInteger);
    setRomanNumeral(numeral);
  }

  return (
    (
      <Provider theme={defaultTheme}>
        <Flex direction="column" margin="size-1000" width="size-6000">
          <Heading
            level={1}
            marginBottom="size-400"
          >
            Roman Numeral Converter
          </Heading>
          <TextField
            marginBottom="size-200"
            width="size-6000"
            label="Enter a number"
            onChange={(number) => cleanInput(number)}
            errorMessage={errorMessage}
            validationState={errorMessage === "" ? undefined: "invalid"}
          />
          <Button
            variant="primary"
            marginBottom="size-200"
            isDisabled={errorMessage !== ""}
            onPress={() => updateRomanNumeral(untranslatedInteger)}
          >
            Convert to Roman Numeral
          </Button>
          <Text
            marginBottom="size-200"
          > 
            {`Roman numeral: ${romanNumeral}`}
          </Text>
        </Flex>
      </Provider>
    )
  );
}

export default App;
