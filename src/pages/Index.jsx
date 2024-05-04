import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack
} from '@chakra-ui/react';

const Index = () => {
  const [payoffMatrix, setPayoffMatrix] = useState([[0, 0, 0, 0], [0, 0, 0, 0]]);
  const [gameResults, setGameResults] = useState([]);
  const [roundNumber, setRoundNumber] = useState(0);
  const [player1Action, setPlayer1Action] = useState('');
  const [player2Action, setPlayer2Action] = useState('');

  const handleInputChange = (value, row, col) => {
    const newMatrix = [...payoffMatrix];
    newMatrix[row][col] = parseInt(value, 10) || 0;
    setPayoffMatrix(newMatrix);
  };

  const playRound = () => {
    const result = `Round ${roundNumber + 1} played at ${new Date().toLocaleTimeString()} with actions ${player1Action} and ${player2Action}`;
    setGameResults([...gameResults, result]);
    setRoundNumber(roundNumber + 1);

    fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ result, payoffMatrix }),
    });
  };

  return (
    <Box p={10} bg="gray.100">
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">Game Theory Experiment</Text>
        <Table variant="simple" size="md">
          <Thead bg="blue.100">
            <Tr>
              <Th color="blue.800">Player \ Player</Th>
              <Th color="blue.800" colSpan="2">Player 1</Th>
              <Th color="blue.800" colSpan="2">Player 2</Th>
            </Tr>
            <Tr>
              <Th color="blue.800"></Th>
              <Th color="blue.800">Payoff 1</Th>
              <Th color="blue.800">Payoff 2</Th>
              <Th color="blue.800">Payoff 1</Th>
              <Th color="blue.800">Payoff 2</Th>
            </Tr>
          </Thead>
          <Tbody>
            {payoffMatrix.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                <Td>Player {rowIndex + 1}</Td>
                {row.map((cell, colIndex) => (
                  <Td key={colIndex}>
                    <Input
                      type="number"
                      value={cell}
                      onChange={(e) => handleInputChange(e.target.value, rowIndex, colIndex)}
                      fontSize="lg"
                      width="100px"
                    />
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Flex direction="row" justify="space-between" align="center" mt={4}>
          <Select placeholder="Select action for Player 1" onChange={(e) => setPlayer1Action(e.target.value)}>
            <option value="action1">Action 1</option>
            <option value="action2">Action 2</option>
          </Select>
          <Select placeholder="Select action for Player 2" onChange={(e) => setPlayer2Action(e.target.value)}>
            <option value="action1">Action 1</option>
            <option value="action2">Action 2</option>
          </Select>
        </Flex>
        <Button colorScheme="teal" size="lg" onClick={playRound}>Play Round</Button>
        <Flex direction="column" align="center" mt={5}>
          <hr />
          <Text fontSize="lg" fontWeight="bold" mt={2}>Current Round: {roundNumber}</Text>
          <Text fontSize="lg" fontWeight="bold">Game Results</Text>
          {gameResults.map((result, index) => (
            <Text key={index}>{result}</Text>
          ))}
        </Flex>
      </VStack>
    </Box>
  );
};

export default Index;