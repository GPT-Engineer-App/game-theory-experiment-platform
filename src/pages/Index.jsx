import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
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
  const [payoffMatrix, setPayoffMatrix] = useState([[0, 0], [0, 0]]);
  const [gameResults, setGameResults] = useState([]);

  const handleInputChange = (value, row, col) => {
    const newMatrix = [...payoffMatrix];
    newMatrix[row][col] = parseInt(value, 10) || 0;
    setPayoffMatrix(newMatrix);
  };

  const playRound = () => {
    // Simulate a game round (this should be replaced with actual game logic)
    const result = `Round played at ${new Date().toLocaleTimeString()}`;
    setGameResults([...gameResults, result]);

    // Send results to API endpoint (replace 'YOUR_API_ENDPOINT' with actual endpoint)
    fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ result, payoffMatrix }),
    });
  };

  return (
    <Box p={5}>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">Game Theory Experiment</Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Player \ Player</Th>
              <Th>Player 1</Th>
              <Th>Player 2</Th>
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
                    />
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button colorScheme="blue" onClick={playRound}>Play Round</Button>
        <Flex direction="column" align="center">
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