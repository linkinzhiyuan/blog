import { isPalindrome } from './_125_is_palinedrome';

describe('isPalindrome', () => {
  it('should return true for an empty string', () => {
    expect(isPalindrome('')).toBe(true);
  });

  it('should return true for a single character', () => {
    expect(isPalindrome('a')).toBe(true);
  });

  it('should return true for a palindrome with only letters', () => {
    expect(isPalindrome('madam')).toBe(true);
  });

  it('should return true for a palindrome with letters and numbers', () => {
    expect(isPalindrome('12321')).toBe(true);
  });

  it('should return true for a palindrome with letters, numbers, and special characters', () => {
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
  });

  it('should return false for not a palindrome with only letters', () => {
    expect(isPalindrome('hello')).toBe(false);
  });

  it('should return false for not a palindrome with letters and numbers', () => {
    expect(isPalindrome('123456')).toBe(false);
  });

  it('should return false for not a palindrome with letters, numbers, and special characters', () => {
    expect(isPalindrome('Was it a car or a cat I saw?')).toBe(true);
  });

  it('should return true for a string with all non-letter characters', () => {
    expect(isPalindrome('1234567890!@#$%^&*()')).toBe(false);
  });

  it('leetCode case 1', () => {
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
  })

  it('leetCode case 2', () => {
    expect(isPalindrome('race a car')).toBe(false);
  })
});

import { isPalindromeRecursion } from './_125_is_palinedrome';

describe('isPalindromeRecursion', () => {
  it('should return true for an empty string', () => {
    expect(isPalindromeRecursion('')).toBe(true);
  });

  it('should return true for a single character', () => {
    expect(isPalindromeRecursion('a')).toBe(true);
  });

  it('should return true for a palindrome with only letters', () => {
    expect(isPalindromeRecursion('madam')).toBe(true);
  });

  it('should return true for a palindrome with letters and numbers', () => {
    expect(isPalindromeRecursion('12321')).toBe(true);
  });

  it('should return true for a palindrome with letters, numbers, and special characters', () => {
    expect(isPalindromeRecursion('A man, a plan, a canal: Panama')).toBe(true);
  });

  it('should return false for not a palindrome with only letters', () => {
    expect(isPalindromeRecursion('hello')).toBe(false);
  });

  it('should return false for not a palindrome with letters and numbers', () => {
    expect(isPalindromeRecursion('123456')).toBe(false);
  });

  it('should return false for not a palindrome with letters, numbers, and special characters', () => {
    expect(isPalindromeRecursion('Was it a car or a cat I saw?')).toBe(true);
  });

  it('should return true for a string with all non-letter characters', () => {
    expect(isPalindromeRecursion('1234567890!@#$%^&*()')).toBe(false);
  });

  it('leetCode case 1', () => {
    expect(isPalindromeRecursion('A man, a plan, a canal: Panama')).toBe(true);
  })

  it('leetCode case 2', () => {
    expect(isPalindromeRecursion('race a car')).toBe(false);
  })
});

import { isPalindromeStack } from './_125_is_palinedrome';

describe('isPalindromeStack', () => {
  it('should return true for an empty string', () => {
    expect(isPalindromeStack('')).toBe(true);
  });

  it('should return true for a single character', () => {
    expect(isPalindromeStack('a')).toBe(true);
  });

  it('should return true for a palindrome with only letters', () => {
    expect(isPalindromeStack('madam')).toBe(true);
  });

  it('should return true for a palindrome with letters and numbers', () => {
    expect(isPalindromeStack('12321')).toBe(true);
  });

  it('should return true for a palindrome with letters, numbers, and special characters', () => {
    expect(isPalindromeStack('A man, a plan, a canal: Panama')).toBe(true);
  });

  it('should return false for not a palindrome with only letters', () => {
    expect(isPalindromeStack('hello')).toBe(false);
  });

  it('should return false for not a palindrome with letters and numbers', () => {
    expect(isPalindromeStack('123456')).toBe(false);
  });

  it('should return false for not a palindrome with letters, numbers, and special characters', () => {
    expect(isPalindromeStack('Was it a car or a cat I saw?')).toBe(true);
  });

  it('should return true for a string with all non-letter characters', () => {
    expect(isPalindromeStack('1234567890!@#$%^&*()')).toBe(false);
  });

  it('leetCode case 1', () => {
    expect(isPalindromeStack('A man, a plan, a canal: Panama')).toBe(true);
  })

  it('leetCode case 2', () => {
    expect(isPalindromeStack('race a car')).toBe(false);
  })
});