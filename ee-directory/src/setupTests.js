import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import EmployeeCard from './components/EmployeeCard';
const { Builder, By, until } = require('selenium-webdriver'); // Ensure only one declaration for Selenium

// Increase Jest test timeout if needed
jest.setTimeout(10000); // Increase timeout for long-running tests (default is 5000ms)

// Employee Card Jest Test
test('renders EmployeeCard with employee details', () => {
  const employee = {
    fullName: 'John Doe',
    username: 'johndoe123',
    status: 'Active',
    doj: '2021-01-15',
    dol: '',
    address: '123 Main St, Springfield, USA',
    primaryPhone: '123-456-7890',
    secondaryPhone: '098-765-4321',
    workEmail: 'john.doe@company.com',
    personalEmail: 'john.doe@gmail.com',
    profilePic: 'https://via.placeholder.com/60',
  };

  render(<EmployeeCard employee={employee} />);

  // Verify rendered content
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('johndoe123')).toBeInTheDocument();
  expect(screen.getByText(/Status: Active/i)).toBeInTheDocument();
  expect(screen.getByText(/D.O.J: 2021-01-15/i)).toBeInTheDocument();
  expect(screen.getByText(/Address: 123 Main St, Springfield, USA/i)).toBeInTheDocument();
  expect(screen.getByText(/Phone: 123-456-7890/i)).toBeInTheDocument();
  expect(screen.getByText(/Work Email: john.doe@company.com/i)).toBeInTheDocument();

  // Check fallback text for missing fields
  expect(screen.getByText(/D.O.L: N\/A/i)).toBeInTheDocument();
});

// Selenium WebDriver Tests for Employee Card Component
describe('EmployeeCard Component', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Should display employee details correctly', async () => {
    try {
      await driver.get('http://localhost:3000/employeeDirectory'); // Adjust your app's URL
    } catch (err) {
      console.error("Error loading the page:", err);
      throw err; // Re-throw the error so the test fails
    }

    const employeeCard = await driver.wait(
      until.elementLocated(By.css('.MuiCard-root')),
      5000
    );

    // Full name
    const fullName = await employeeCard.findElement(By.css('h6')).getText();
    expect(fullName).toBe('John Doe');

    // Username
    const username = await employeeCard.findElement(By.xpath("//p[contains(text(), 'johndoe123')]")).getText();
    expect(username).toContain('johndoe123');

    // Fallbacks
    const dol = await employeeCard.findElement(By.xpath("//p[contains(text(), 'D.O.L:')]")).getText();
    expect(dol).toContain('N/A');
  });
});

// Selenium WebDriver Tests for Employee List Component
describe('EmployeeList Component', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('should render employee details correctly', async () => {
    try {
      await driver.get('http://localhost:3000/employeeDirectory'); // Replace with your app's URL
    } catch (err) {
      console.error("Error loading the page:", err);
      throw err; // Re-throw the error so the test fails
    }

    // Wait until the table is loaded
    await driver.wait(until.elementLocated(By.css('table')), 5000);

    // Get all the rows in the employee list table
    const rows = await driver.findElements(By.css('table tbody tr'));

    // Assert that at least one row exists (meaning the employee list is populated)
    expect(rows.length).toBeGreaterThan(0);

    // Test for each employee's details in the list
    for (let row of rows) {
      const profilePic = await row.findElement(By.css('td img')).getAttribute('src');
      const fullName = await row.findElement(By.css('td:nth-child(2)')).getText();
      const position = await row.findElement(By.css('td:nth-child(3)')).getText();
      const phone = await row.findElement(By.css('td:nth-child(4)')).getText();
      const email = await row.findElement(By.css('td:nth-child(5)')).getText();

      // Verify the profile picture source (check if the URL is valid)
      expect(profilePic).toMatch(/^https?:\/\//); // Verify valid URL for profile pic
      
      // Verify the full name, position, phone, and email
      expect(fullName).toBeTruthy(); // Ensure full name is not empty
      expect(position).toBeTruthy(); // Ensure position is not empty
      expect(phone).toBeTruthy(); // Ensure phone number is not empty
      expect(email).toBeTruthy(); // Ensure email is not empty
    }
  });

  test('should render fallback for missing employee details', async () => {
    try {
      await driver.get('http://localhost:3000/employeeDirectory'); // Replace with your app's URL
    } catch (err) {
      console.error("Error loading the page:", err);
      throw err; // Re-throw the error so the test fails
    }

    // Wait until the table is loaded
    await driver.wait(until.elementLocated(By.css('table')), 5000);

    const rows = await driver.findElements(By.css('table tbody tr'));

    for (let row of rows) {
      // Check for missing fields like phone, email, or other info
      const phone = await row.findElement(By.css('td:nth-child(4)')).getText();
      const email = await row.findElement(By.css('td:nth-child(5)')).getText();

      // Check if missing details are shown as "N/A" or fallback value
      if (!phone) {
        expect(phone).toBe('N/A'); // Ensure 'N/A' is shown for missing data
      }
      if (!email) {
        expect(email).toBe('N/A'); // Ensure 'N/A' is shown for missing data
      }
    }
  });
});

// Pagination Tests for the Pagination Component
describe('Pagination Component', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Dropdown for items per page is functional', async () => {
    try {
      await driver.get('http://localhost:3000/employeeDirectory');
    } catch (err) {
      console.error("Error loading the page:", err);
      throw err; // Re-throw the error so the test fails
    }

    const dropdown = await driver.wait(
      until.elementLocated(By.css('div[role="button"]')),
      5000
    );

    // Open dropdown and select '25'
    await dropdown.click();
    const option = await driver.findElement(By.xpath("//li[text()='25']"));
    await option.click();

    // Validate selected value
    const selectedValue = await dropdown.getText();
    expect(selectedValue).toBe('25');
  });

  test('Pagination controls change pages', async () => {
    try {
      await driver.get('http://localhost:3000/employeeDirectory');
    } catch (err) {
      console.error("Error loading the page:", err);
      throw err; // Re-throw the error so the test fails
    }

    const pagination = await driver.wait(
      until.elementLocated(By.css('.MuiPagination-ul')),
      5000
    );

    // Go to next page
    const nextPageButton = await pagination.findElement(By.xpath("//button[@aria-label='Go to next page']"));
    await nextPageButton.click();

    // Validate active page
    const activePage = await pagination.findElement(By.css('.Mui-selected')).getText();
    expect(activePage).toBe('2');
  });
});
