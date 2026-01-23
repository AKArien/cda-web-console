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
        {
            const access = driver.findElement(By.name("access"))
            const pass = driver.findElement(By.name("pass"))
            const req_dur = driver.findElement(By.name("req_dur"))
            const submit = driver.findElement(By.name("submit"))
            await access.sendKeys("user")
            await pass.sendKeys("password")
            await req_dur.sendKeys("30")
            await submit.click()
        }

        // being redirected here means we got logged in
        expect(driver.getCurrentUrl()).toBe(url)

        // tour every page by clicking buttons

        // info/parameters
        {
            const access_info = driver.findElement(By.name("access"))
            await access_info.click()
        }
        expect(driver.getCurrentUrl()).toBe(url + "/access")
        {
            const expires = driver.findElement(By.name("expires"))
            expect(expires.getText()).toBe("Never")

            const change_pass = driver.findElement(By.name("change_pass"))
            await change_pass.click()
            const old_pass = driver.findElement(By.name("old_pass"))
            const pass1 = driver.findElement(By.name("pass1"))
            const pass2 = driver.findElement(By.name("pass2"))
            const submit = driver.findElement(By.name("submit"))
            await old_pass.sendKeys("password")
            await pass1.sendKeys("newpassword")
            await pass2.sendKeys("newpassword")
            await submit.click()
            // todo : tell apart failure from success
            const dashboard = driver.findElement(By.name("dashboard"))
        }
        expect(driver.getCurrentUrl()).toBe(url + "/dashboard")
        {
            
        }
    })

}

export function edge_cases(browser: string){
    test("Edge cases", async () => {
        const driver = await new Builder().forBrowser(browser).build()
        
        // ensure force change password does it’s job
    })
}