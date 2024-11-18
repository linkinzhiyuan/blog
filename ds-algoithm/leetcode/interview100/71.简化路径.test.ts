import { simplifyPath } from './71.简化路径';

describe('simplifyPath', () => {
  it('should return empty string for empty path', () => {
    expect(simplifyPath('')).toBe('/');
  });

  it('should return single directory for single directory path', () => {
    expect(simplifyPath('/a')).toBe('/a');
  });

  it('should return multiple directories for multiple directories path', () => {
    expect(simplifyPath('/a/b/c')).toBe('/a/b/c');
  });

  it('should handle directory with . and ..', () => {
    expect(simplifyPath('/a/./b/../c')).toBe('/a/c');
  });

  it('should handle directory with multiple . and ..', () => {
    expect(simplifyPath('/a/././b/../c/../d')).toBe('/a/d');
  });

  it('should handle directory with trailing slash', () => {
    expect(simplifyPath('/a/b/c/')).toBe('/a/b/c');
  });

  it('should handle directory with leading slash', () => {
    expect(simplifyPath('//a/b/c')).toBe('/a/b/c');
  });

  it('should handle directory with multiple slashes', () => {
    expect(simplifyPath('/a//b/c')).toBe('/a/b/c');
  });
});
