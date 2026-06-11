import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import path from 'path';

export interface TestCase {
  ID: string;
  Title: string;
  Section: string;
  Priority: string;
  Type: string;
  AutomationType: string;
  Preconditions: string;
  Steps: string;
  ExpectedResult: string;
  EstimatedTime: string;
}

/**
 * Reads test cases from a CSV file.
 * @param relativePath - Path to the CSV file relative to the project root.
 */
export function readTestCases(relativePath: string): TestCase[] {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const fileContent = readFileSync(absolutePath, 'utf-8');
  const records = parse(fileContent, {
    columns: [
      'ID',
      'Title',
      'Section',
      'Priority',
      'Type',
      'AutomationType',
      'Preconditions',
      'Steps',
      'ExpectedResult',
      'EstimatedTime',
    ],
    skip_empty_lines: true,
    from_line: 2, // Skip header
  });
  return records as TestCase[];
}
