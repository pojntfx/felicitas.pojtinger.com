import { common } from "./common";

const footer = {
  legal: {
    global: {
      product: `${common.title} Site`,
      timeSpan: "2019",
      holder: common.author,
      help: {
        title: "Copyright Holder",
        text:
          "This is the individual or organization that holds the copyright of this product.",
        docsLink: `${common.site}/docs/copyright`
      }
    },
    licenses: [
      {
        product: `${common.title} Site`,
        type: "Media",
        icon: "images",
        timeSpan: "2019",
        holder: common.author,
        spdxLicenseIdentifier: "CC-BY-SA-4.0",
        text:
          "This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.",
        badge: {
          img: "https://licensebuttons.net/l/by-sa/4.0/88x31.png",
          title: "CC-BY-SA-4.0 license badge"
        },
        more: {
          link: "https://creativecommons.org/licenses/by-sa/4.0/",
          title: "the Creative Commons"
        },
        help: {
          title: "Media License",
          text: "This is the license that applies to this product's media.",
          docsLink: `${common.site}/docs/copyright/media`
        }
      },
      {
        product: `${common.title} Site`,
        type: "Code",
        icon: "code",
        timeSpan: "2019",
        holder: common.author,
        spdxLicenseIdentifier: "AGPL-3.0",
        text:
          "This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.\nThis program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.\nYou should have received a copy of the GNU Affero General Public License along with this program. If not, see https://www.gnu.org/licenses/.",
        badge: {
          img: "https://www.gnu.org/graphics/agplv3-155x51.png",
          title: "AGPL-3.0 license badge"
        },
        more: {
          link: "https://www.gnu.org/licenses/agpl.html",
          title: "the Free Software Foundation"
        },
        help: {
          title: "Code License",
          text:
            "This is the license that applies to this product's source code.",
          docsLink: `${common.site}/docs/copyright/code`
        }
      }
    ]
  }
};

export { footer };
