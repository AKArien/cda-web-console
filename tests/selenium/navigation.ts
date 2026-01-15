import { test, expect } from "vitest"
import { Builder, By } from "selenium-webdriver"

const url = "https://localhost:4430"

export function basic_nav(browser: string){
    test("Basic navigation", async () => {
        const driver = await new Builder().forBrowser(browser).build()
        
        // implicit waits. A response time of over 2 seconds in testing
        // environment is consideried too long and thus a fail
        await driver.manage().setTimeouts({ implicit: 2000 });

        await driver.get(url)
        
        expect(driver.getCurrentUrl()).toBe(url + "/login")
        // login
        const access = driver.findElement(By.name("access"))
        const pass = driver.findElement(By.name("pass"))
        const req_dur = driver.findElement(By.name("req_dur"))
        const submit = driver.findElement(By.name("submit"))
        await access.sendKeys("user")
        await pass.sendKeys("password")
        await req_dur.sendKeys("30")
        await submit.click()

        // being redirected here means we got logged in
        expect(driver.getCurrentUrl()).toBe(url + "/")


    })

}

export function edge_cases(browser: string){
    test("Edge cases", async () => {
        const driver = await new Builder().forBrowser(browser).build()

    })
}