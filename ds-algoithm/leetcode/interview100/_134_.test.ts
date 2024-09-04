import { canCompleteCircuit, canCompleteCircuitDp } from './_134_can_complete_circuit';

describe('canCompleteCircuit', () => {
  it('should return the start point of a valid circuit', () => {
    const gas = [1, 2, 3, 4, 5];
    const cost = [3, 4, 5, 1, 2];
    expect(canCompleteCircuit(gas, cost)).toBe(3);
  });

  it('should return the start point of a valid circuit with multiple possible start points', () => {
    const gas = [2, 3, 4, 3, 4];
    const cost = [3, 4, 3, 4, 3];
    expect(canCompleteCircuit(gas, cost)).toBe(-1);
  });

  it('should return -1 for an invalid circuit with no possible start points', () => {
    const gas = [1, 2, 3, 4, 5];
    const cost = [6, 7, 8, 9, 10];
    expect(canCompleteCircuit(gas, cost)).toBe(-1);
  });

  it('should handle edge case with gas and cost arrays with one element', () => {
    const gas = [1];
    const cost = [1];
    expect(canCompleteCircuit(gas, cost)).toBe(0);
  });

  it('should handle edge case with gas and cost arrays with two elements', () => {
    const gas = [1, 2];
    const cost = [2, 1];
    expect(canCompleteCircuit(gas, cost)).toBe(1);
  });

  it('should handle large input arrays', () => {
    const gas = Array(10000).fill(1);
    const cost = Array(10000).fill(1);
    expect(canCompleteCircuit(gas, cost)).toBe(0);
  });
});