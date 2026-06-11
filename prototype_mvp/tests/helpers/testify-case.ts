import { test } from '@playwright/test';

/** Records TestRail-style case ID in the HTML report and Playwright metadata. */
export function testifyCase(id: string, title: string): void {
  const label = `${id}: ${title}`;
  test.info().annotations.push({ type: 'case', description: label });
  test.info().annotations.push({ type: 'testrail', description: id });
}
