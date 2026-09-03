const homePage = document.getElementById("home-page");
const detailPage = document.getElementById("detail-page");
const topicContent = document.getElementById("topic-content");
const backButton = document.getElementById("back-button");

const favoriteButton = document.getElementById("favorite-button");
const showFavoritesButton = document.getElementById("show-favorites");
let currentTopic = "";
let favoriteTopics = JSON.parse(localStorage.getItem("mwFavorites")) || [];

function updateFavoriteButton() {
  const isFavorite = favoriteTopics.includes(currentTopic);

  if (isFavorite) {
    favoriteButton.textContent = "★ Saved in Favorites";
  } else {
    favoriteButton.textContent = "☆ Add to Favorites";
  }
}

const topics = {
  basics: {
    title: "Microwave Basics",
    text: "Microwave transmission sends information between two locations using high-frequency radio waves.",
    points: [
      "A microwave link needs a clear Line of Sight (LOS).",
      "The antenna sends and receives radio signals.",
      "Signal level is measured in dBm.",
      "Strong RSL normally gives a more stable link.",
      "Rain, obstacles, wrong alignment, and cable faults can reduce performance."
    ]
  },

  bands: {
    title: "Frequency Bands",
    text: "The frequency band is selected based on distance, capacity, antenna size, and rain conditions.",
    points: [
      "7 GHz and 11 GHz: normally used for long-distance links.",
      "18 GHz and 23 GHz: common for medium-distance links.",
      "26 GHz, 32 GHz, and 38 GHz: used for short high-capacity links.",
      "Higher frequencies have more rain attenuation.",
      "Lower frequencies usually support longer links."
    ]
  },

  equipment: {
    title: "Equipment Guide",
    text: "A microwave link has indoor, outdoor, antenna, cable, and protection equipment.",
    points: [
      "IDU: Indoor Unit inside the shelter or cabinet.",
      "ODU: Outdoor Unit installed near the antenna.",
      "Antenna: sends and receives microwave signals.",
      "IF cable: connects the IDU and ODU.",
      "Grounding protects equipment from lightning and electrical faults."
    ]
  },

  troubleshooting: {
    title: "Troubleshooting",
    text: "Use these quick checks for common microwave link issues.",
    points: [
      "Link Down: check power, ODU alarm, cable, and radio status.",
      "Low RSL: check alignment, rain, obstacle, and connectors.",
      "High BER: check RSL, interference, and physical connections.",
      "Modulation Down: check rain fade, RSL, and capacity.",
      "XPIC issue: check both polarizations and antenna alignment."
    ]
  }
};

topics.design = {
  title: "Link Design",
  text: "Link design makes sure that a microwave link will work reliably before installation.",
  points: [
    "LOS means Line of Sight: the two antennas must see each other without an obstacle.",
    "The Fresnel zone is the area around the radio path that should remain clear.",
    "RSL means Received Signal Level at the receiving radio.",
    "Fade margin is extra signal level kept to protect the link during rain or fading.",
    "Antenna diameter, frequency, distance, and rain zone affect the link design."
  ]
};

topics.installation = {
  title: "Installation & Alignment",
  text: "Correct installation and alignment are essential for good RSL and stable microwave performance.",
  points: [
    "Check the antenna bracket, tower condition, and required antenna height.",
    "Install the ODU securely and connect all cables correctly.",
    "Use proper grounding and weatherproof every outdoor connector.",
    "Set the correct azimuth before fine antenna alignment.",
    "Adjust the antenna slowly while monitoring RSL.",
    "Confirm the correct polarization: Horizontal (H) or Vertical (V)."
  ]
};

topics.survey = {
  title: "Site Survey & Safety",
  text: "A site survey confirms that the site is suitable before microwave installation.",
  points: [
    "Record the Site ID, GPS coordinates, tower height, and available antenna space.",
    "Check Line of Sight toward the far-end site.",
    "Take clear photos of the tower, equipment area, power source, and antenna direction.",
    "Check access road, site security, power availability, and grounding.",
    "Use PPE: helmet, safety belt, gloves, and proper climbing equipment.",
    "Never climb or work on the tower in unsafe weather conditions."
  ]
};

topics.dictionary = {
  title: "Microwave Dictionary",
  text: "Important microwave transmission terms.",
  points: [
    "ACM: Adaptive Coding and Modulation.",
    "ATPC: Automatic Transmit Power Control.",
    "BER: Bit Error Rate.",
    "EIRP: Effective Isotropic Radiated Power.",
    "Fresnel Zone: the clear area required around a microwave path.",
    "IDU: Indoor Unit.",
    "ODU: Outdoor Unit.",
    "RSL: Received Signal Level.",
    "XPIC: Cross Polarization Interference Cancellation."
  ]
};
topics.basics.details = [
  {
    heading: "1. How a Microwave Link Works",
    text: "A microwave link connects two locations using radio waves. One antenna transmits the signal and the far-end antenna receives it. The link normally needs clear Line of Sight between both antennas."
  },
  {
    heading: "2. dB, dBm, and dBi",
    text: "dB is used to show gain or loss. dBm shows signal power, such as transmit power or RSL. dBi shows antenna gain. A larger antenna normally has higher gain."
  },
  {
    heading: "3. RSL",
    text: "RSL means Received Signal Level. It is the signal power received by the far-end radio. Example: -45 dBm is stronger than -65 dBm. Low RSL can cause low modulation, errors, or a link down."
  },
  {
    heading: "4. Modulation and Capacity",
    text: "Higher modulation can carry more traffic, but it needs better signal quality. During heavy rain or weak RSL, the radio may reduce modulation to keep the link working."
  },
  {
    heading: "5. Fade Margin",
    text: "Fade margin is extra received signal above the receiver sensitivity. It protects the link during rain, interference, antenna movement, or temporary fading."
  },
  {
    heading: "6. Common Causes of Weak Signal",
    text: "Weak RSL may happen because of wrong antenna alignment, rain fade, a new obstacle in the path, damaged IF cable, loose connectors, low transmit power, or ODU problems."
  }
];

topics.bands.details = [
  {
    heading: "1. How to Choose a Frequency Band",
    text: "Select a band after checking the link distance, required capacity, rain zone, antenna size, available spectrum, and required availability. There is no single best frequency for every link."
  },
  {
    heading: "2. 7 GHz and 11 GHz",
    text: "These lower microwave bands are commonly chosen for longer links because they have lower rain attenuation. They may require larger antennas and more spectrum planning."
  },
  {
    heading: "3. 18 GHz and 23 GHz",
    text: "These are widely used for medium-distance links. They provide a practical balance between capacity, antenna size, link distance, and rain performance."
  },
  {
    heading: "4. 26 GHz and 32 GHz",
    text: "These higher bands are usually selected for shorter links with good Line of Sight. They can provide high capacity but are more affected by heavy rain."
  },
  {
    heading: "5. 38 GHz",
    text: "38 GHz is normally used for short, high-capacity urban links. It needs very good alignment and enough fade margin because rain attenuation is high."
  },
  {
    heading: "6. Rain Fade",
    text: "Rain absorbs and scatters microwave energy. The effect becomes stronger at higher frequencies. During heavy rain, RSL may decrease and ACM can reduce modulation to keep traffic running."
  },
  {
    heading: "7. Important Field Tip",
    text: "Do not select a frequency band only by distance. Always check link-budget results, expected rain attenuation, antenna gain, required capacity, and network availability target."
  }
];
topics.equipment.details = [
  {
    heading: "1. Antenna",
    text: "The microwave antenna focuses radio energy toward the far-end site. Larger antennas normally give higher gain and better protection against rain fading, but need stronger mounting space on the tower."
  },
  {
    heading: "2. ODU",
    text: "ODU means Outdoor Unit. It is installed near the antenna and converts the indoor intermediate-frequency signal to the microwave radio frequency signal, and back again."
  },
  {
    heading: "3. IDU",
    text: "IDU means Indoor Unit. It is installed in the site shelter, cabinet, or transmission room. It provides traffic interfaces, management access, power connection, and communication with the ODU."
  },
  {
    heading: "4. IF Cable",
    text: "The IF cable connects the IDU to the ODU. Bad cable quality, water entry, loose connectors, or sharp bending can cause low RSL, alarms, instability, or link down."
  },
  {
    heading: "5. Grounding and Surge Protection",
    text: "Correct grounding protects people and equipment from lightning and electrical surges. Grounding points must be secure, clean, and connected according to the approved installation standard."
  },
  {
    heading: "6. Huawei RTN Equipment",
    text: "Huawei RTN equipment, such as RTN 905, 910, 950A, and 980, is used in microwave transmission networks. The available boards, ports, traffic capacity, and radio configuration depend on the exact model and installed hardware."
  },
  {
    heading: "7. XPIC",
    text: "XPIC means Cross Polarization Interference Cancellation. It allows two signals with Horizontal and Vertical polarization to use the same frequency channel, increasing capacity when the link is correctly installed and aligned."
  },
  {
    heading: "8. Field Check Before Power On",
    text: "Before powering on, check the ODU mounting, antenna polarization, weatherproofing, cable label, connector tightness, grounding, correct port connection, and site power status."
  }
];

topics.design.details = [
  {
    heading: "1. Line of Sight (LOS)",
    text: "LOS means the antennas at both sites have a clear visual radio path. Buildings, hills, trees, cranes, or future construction can block the signal and make the link unstable or completely down."
  },
  {
    heading: "2. Fresnel Zone",
    text: "The Fresnel zone is the area around the direct microwave path. It should be kept mostly clear because an obstacle inside it can weaken the signal even when the antennas can still visually see each other."
  },
  {
    heading: "3. Required Fresnel Clearance",
    text: "A common design target is at least 60% clearance of the first Fresnel zone. The exact requirement depends on the network design standard, terrain, frequency, path length, and reliability target."
  },
  {
    heading: "4. Antenna Height",
    text: "Antenna height is selected to clear terrain, buildings, trees, and the Fresnel zone. Do not select a height only because space is available; confirm the full path profile first."
  },
  {
    heading: "5. Link Budget",
    text: "A link budget estimates whether the received signal will be strong enough. It includes transmit power, antenna gain, free-space path loss, cable loss, connector loss, branching loss, and receiver sensitivity."
  },
  {
    heading: "6. Fade Margin",
    text: "Fade margin is the difference between expected RSL and the receiver threshold. More fade margin gives better protection against rain, multipath fading, interference, and small alignment changes."
  },
  {
    heading: "7. Antenna Diameter",
    text: "A larger antenna usually provides higher gain and better fade margin. However, it needs more tower space, stronger mounting, and more wind-load consideration."
  },
  {
    heading: "8. Polarization and XPIC",
    text: "Horizontal and Vertical polarization can be used to increase capacity. In XPIC links, both polarizations must be installed accurately, with good antenna alignment and cross-polar discrimination."
  },
  {
    heading: "9. Final Design Review",
    text: "Before approval, review the path profile, LOS, Fresnel clearance, link budget, rain region, required capacity, antenna size, frequency plan, power availability, and future obstacle risk."
  }
];

topics.installation.details = [
  {
    heading: "1. Before Going to Site",
    text: "Confirm the approved design, antenna height, azimuth, polarization, equipment list, frequency plan, work permit, access arrangement, and safety equipment before travel."
  },
  {
    heading: "2. Antenna Installation",
    text: "Install the antenna on the approved tower position. Ensure the bracket is strong, the antenna is secure, and there is enough space to avoid interference with other antennas."
  },
  {
    heading: "3. Polarization",
    text: "Set the antenna to the approved Horizontal or Vertical polarization. A wrong polarization can cause weak signal, interference, or XPIC problems."
  },
  {
    heading: "4. ODU and Cable Connection",
    text: "Install the ODU correctly near the antenna. Connect the IF cable carefully, avoid sharp bends, tighten connectors properly, and make sure every external connection is weatherproof."
  },
  {
    heading: "5. Grounding",
    text: "Connect the ODU, cable grounding kits, antenna structure, and equipment cabinet to the approved grounding system. Poor grounding increases lightning and surge risk."
  },
  {
    heading: "6. Coarse Alignment",
    text: "Use the approved azimuth and a compass or alignment tool to point the antenna approximately toward the far-end site. Do not use a phone compass as the only final alignment reference."
  },
  {
    heading: "7. Fine Alignment",
    text: "Monitor RSL while moving the antenna slowly in horizontal and vertical directions. Stop at the strongest and most stable RSL. Tighten bolts only after confirming the final position."
  },
  {
    heading: "8. Weatherproofing",
    text: "Use approved weatherproof tape and sealing material on outdoor connectors. Water entering a connector or cable can cause intermittent alarms, weak signal, and link failure."
  },
  {
    heading: "9. Final Acceptance Checks",
    text: "Confirm expected RSL, traffic status, modulation, BER, alarms, grounding, cable labels, antenna bolts, photos, and acceptance documents before closing the work."
  }
];

topics.troubleshooting.details = [
  {
    heading: "1. First Rule: Compare With Normal Values",
    text: "Before changing anything, compare the current RSL, modulation, alarms, traffic, transmit power, and BER with the normal or planned values. This helps identify what changed."
  },
  {
    heading: "2. Link Down",
    text: "Check site power, IDU status, ODU status, cable connection, protection devices, far-end status, alarms, and recent work. If both ends are reachable, compare alarms and RSL from both sides."
  },
  {
    heading: "3. Low RSL",
    text: "Compare current RSL with expected RSL. Check rain condition, antenna alignment, antenna movement, obstacle growth, loose connectors, IF cable condition, ODU alarm, and transmit power."
  },
  {
    heading: "4. High BER",
    text: "High Bit Error Rate can be caused by weak RSL, interference, wrong alignment, poor connector condition, cable damage, radio fault, or polarization and XPIC issues."
  },
  {
    heading: "5. Modulation Degradation",
    text: "When ACM reduces modulation, the radio is protecting traffic because signal quality has become weak. Check rain fade, RSL drop, interference, capacity status, antenna alignment, and fade margin."
  },
  {
    heading: "6. XPIC Issue",
    text: "Check that both H and V radios are up, the correct polarization is used, both antennas are aligned, RSL is balanced as required, and there are no faults on one radio path."
  },
  {
    heading: "7. IF Cable or Connector Issue",
    text: "Inspect for damaged cable, loose connector, water entry, poor weatherproofing, sharp bends, grounding damage, or wrong port connection. Replace or repair only under the approved work process."
  },
  {
    heading: "8. Weather-Related Issue",
    text: "Heavy rain can reduce RSL, especially on high-frequency links. Check whether the link recovers after rain. Repeated rain outages may mean insufficient fade margin, wrong design, or an alignment problem."
  },
  {
    heading: "9. After the Fix",
    text: "Confirm alarms are cleared, RSL is stable, modulation and traffic are normal, BER is acceptable, and the link remains stable. Record the root cause and the action taken."
  }
];

topics.survey.details = [
  {
    heading: "1. Site Identification",
    text: "Record the Site ID, site name, owner or landlord contact if required, site address, GPS coordinates, and date of the survey."
  },
  {
    heading: "2. Tower and Antenna Space",
    text: "Check the tower type, available height, antenna mounting space, existing antennas, structural condition, cable route, and possible interference with other equipment."
  },
  {
    heading: "3. LOS Survey",
    text: "Confirm the far-end direction and look for hills, buildings, trees, cranes, or future construction risk. Record the required antenna height and take direction photos."
  },
  {
    heading: "4. Required Photographs",
    text: "Take clear photographs of the tower, proposed antenna location, far-end direction, equipment cabinet, power source, grounding bar, cable route, access road, and any obstruction."
  },
  {
    heading: "5. Power and Grounding",
    text: "Check available AC or DC power, breaker capacity, cabinet space, battery system if present, grounding bar condition, and the possible route for new grounding cables."
  },
  {
    heading: "6. Access and Security",
    text: "Check road access, site gate, keys or access approval, security requirements, work-hours restrictions, parking space, lifting requirements, and weather risks."
  },
  {
    heading: "7. Personal Protective Equipment",
    text: "Use a helmet, full-body harness, double lanyard, safety shoes, gloves, and other approved PPE. Inspect safety equipment before use."
  },
  {
    heading: "8. Unsafe Conditions",
    text: "Do not climb or carry out tower work during lightning, strong wind, heavy rain, poor visibility, unsafe tower condition, or without the required work permit and safety controls."
  },
  {
    heading: "9. Survey Report",
    text: "The final report should clearly show the proposed solution, tower height, antenna position, LOS result, photos, required materials, safety risks, access information, and any limitations."
  }
];

topics.dictionary.details = [
  {
    heading: "ACM — Adaptive Coding and Modulation",
    text: "ACM automatically changes modulation and coding according to link quality. When signal quality becomes weak, capacity may reduce temporarily so the link can remain available."
  },
  {
    heading: "ATPC — Automatic Transmit Power Control",
    text: "ATPC automatically changes transmit power. It can reduce power during good conditions and increase it when the link experiences fading, based on the configured limits."
  },
  {
    heading: "BER — Bit Error Rate",
    text: "BER shows the number of received bits that contain errors. High BER can indicate weak signal, interference, equipment issues, poor alignment, or cable and connector faults."
  },
  {
    heading: "dB, dBm, and dBi",
    text: "dB describes gain or loss. dBm is a power level, for example transmit power or RSL. dBi is antenna gain compared with an ideal isotropic antenna."
  },
  {
    heading: "EIRP — Effective Isotropic Radiated Power",
    text: "EIRP is the effective power radiated in the antenna direction after considering transmit power, antenna gain, and losses."
  },
  {
    heading: "Fresnel Zone",
    text: "The Fresnel zone is the area around the direct radio path that should be sufficiently clear to avoid signal loss caused by diffraction or obstacles."
  },
  {
    heading: "IDU and ODU",
    text: "IDU is the Indoor Unit, normally installed in a cabinet or shelter. ODU is the Outdoor Unit, normally installed close to the antenna."
  },
  {
    heading: "LOS — Line of Sight",
    text: "LOS means there is a clear direct path between the two microwave antennas. It is one of the main requirements for a reliable microwave link."
  },
  {
    heading: "RSL — Received Signal Level",
    text: "RSL is the power level received by the far-end radio, normally shown in dBm. A less-negative value is stronger: for example, -45 dBm is stronger than -65 dBm."
  },
  {
    heading: "XPIC — Cross Polarization Interference Cancellation",
    text: "XPIC helps two cross-polarized radio channels use the same frequency more efficiently. It requires correct antenna installation, polarization, alignment, and signal quality."
  }
];

document.querySelectorAll(".guide-card").forEach(function (card) {
  card.addEventListener("click", function () {
    const topicName = card.dataset.topic;
const topic = topics[topicName];

currentTopic = topicName;

    if (topic) {
      topicContent.innerHTML = `
        <h2>${topic.title}</h2>
        <p>${topic.text}</p>

        <h3>Quick Information</h3>

        <ul>
          ${topic.points.map(function (point) {
            return `<li>${point}</li>`;
          }).join("")}
                </ul>

        ${topic.details ? topic.details.map(function (detail) {
          return `
            <h3>${detail.heading}</h3>
            <p>${detail.text}</p>
          `;
        }).join("") : ""}
      `;
    } else {
      topicContent.innerHTML = `
        <h2>Coming Soon</h2>
        <p>This section will be added later.</p>
      `;
    }

   homePage.classList.add("hidden");
detailPage.classList.remove("hidden");

favoriteButton.style.display = "inline-block";
updateFavoriteButton();
  });
});

backButton.addEventListener("click", function () {
  detailPage.classList.add("hidden");
  homePage.classList.remove("hidden");
});
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.toLowerCase();

  document.querySelectorAll(".guide-card").forEach(function (card) {
    const cardText = card.innerText.toLowerCase();

    if (cardText.includes(searchText)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

favoriteButton.addEventListener("click", function () {
  const isFavorite = favoriteTopics.includes(currentTopic);

  if (isFavorite) {
    favoriteTopics = favoriteTopics.filter(function (topic) {
      return topic !== currentTopic;
    });
  } else {
    favoriteTopics.push(currentTopic);
  }

  localStorage.setItem("mwFavorites", JSON.stringify(favoriteTopics));

  updateFavoriteButton();
});
showFavoritesButton.addEventListener("click", function () {
  favoriteButton.style.display = "none";

  if (favoriteTopics.length === 0) {
    topicContent.innerHTML = `
      <h2>My Favorites</h2>
      <p>You have not saved any topics yet.</p>
    `;
  } else {
    const favoriteList = favoriteTopics.map(function (topicName) {
      return `<li>${topics[topicName].title}</li>`;
    }).join("");

    topicContent.innerHTML = `
      <h2>My Favorites</h2>
      <p>Your saved topics:</p>
      <ul>${favoriteList}</ul>
    `;
  }

  homePage.classList.add("hidden");
  detailPage.classList.remove("hidden");
});
showFavoritesButton.addEventListener("click", function () {
  favoriteButton.style.display = "none";

  if (favoriteTopics.length === 0) {
    topicContent.innerHTML = `
      <h2>My Favorites</h2>
      <p>You have not saved any topics yet.</p>
    `;
  } else {
    const favoriteList = favoriteTopics.map(function (topicName) {
      return `<li>${topics[topicName].title}</li>`;
    }).join("");

    topicContent.innerHTML = `
      <h2>My Favorites</h2>
      <p>Your saved topics:</p>
      <ul>${favoriteList}</ul>
    `;
  }

  homePage.classList.add("hidden");
  detailPage.classList.remove("hidden");
});
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./service-worker.js");
  });
}