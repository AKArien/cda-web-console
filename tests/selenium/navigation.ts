import { test } from "vitest"
import { Builder } from "selenium-webdriver"

export function basic_nav(browser: string){
    test("Basic navigation", async () => {
        const driver = await new Builder().forBrowser(browser).build()

    })

}

export function edge_cases(browser: string){
    test("edge cases", async () => {
        const driver = await new Builder().forBrowser(browser).build()

    })
}