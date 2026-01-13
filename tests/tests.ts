import { describe } from "vitest"
import { basic_nav, edge_cases } from "./selenium/navigation"
import { login } from "../src/lib/auth/login"
import { logout } from "../src/lib/auth/logout"
import { Browser } from "selenium-webdriver"

const browsers = [Browser.CHROME, Browser.FIREFOX]

browsers.forEach((browser) => {
    describe(browser, () => {
        basic_nav(browser)
        edge_cases(browser)
    })
})