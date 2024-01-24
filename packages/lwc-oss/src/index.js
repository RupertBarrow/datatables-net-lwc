// SLDS
import "@lwc/synthetic-shadow"

import { createElement } from "lwc"

import App from "main/app"

const app = createElement("main-app", { is: App })

/***************************************************************
 * WEB APP
 */
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector("#main").appendChild(app)
