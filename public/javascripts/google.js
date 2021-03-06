  function onSignIn(googleUser) {
    console.log('hehehehehhehehehehehhehehehehheheheh');
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log('Full Name: ' + profile.getName());
    console.log('imag Name: ' + profile.getImageUrl());
    let imgUrl = profile.getImageUrl();
    let id = profile.getId(); // Don't send this directly to your server!
    let first = profile.getGivenName();
    let last = profile.getFamilyName();
    let email = profile.getEmail();

    console.log(imgUrl);
    sendGoogleInfo(first, last, email, 'googleUser', imgUrl)
    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  };

  const createAccount = (first, last, email, password, imgUrl) => $.ajax({
    method: 'POST',
    url: '/signup',
    data: {
      firstName: first,
      lastName: last,
      email: email,
      password: password,
      profilePicUrl: imgUrl,
      isInstructor: false,
      isAJAX: true
    },
    success: (data) => {
      window.location.replace(data);
    }

  })
  const sendGoogleInfo = (first, last, email, password, imgUrl) => $.ajax({
    method: 'POST',
    url: '/login',
    data: {
      firstName: first,
      lastName: last,
      email: email,
      password: password,
      isGoogle: true
    },
    success: (data) => {
      if (data === 'post') {
        createAccount(first, last, email, password, imgUrl)
      } else {
        window.location.replace(data);
      }

    }
  })
