import { describe } from "vitest"
import { basic_nav, edge_cases } from "./selenium/navigation"
import { login } from "../src/lib/auth/login"
import { logout } from "../src/lib/auth/logout"

describe("Navigation", () => {
    basic_nav()
    edge_cases()
})