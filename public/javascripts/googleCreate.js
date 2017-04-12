function onSignIn(googleUser) {
  console.log('hehehehehhehehehehehhehehehehheheheh');
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log('Full Name: ' + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  let id = profile.getId(); // Don't send this directly to your server!
  let first = profile.getGivenName();
  let last = profile.getFamilyName();
  let email = profile.getEmail();

  sendGoogleInfo(first, last, email, 'googleUser')
  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
};

const sendGoogleInfo = (first, last, email, password) => $.ajax({
  method: 'POST',
  url: '/signup',
  data: {
    firstName: first,
    lastName: last,
    email: email,
    password: password,
    isInstructor: false,
    isAJAX: true

  },
  success: (data) => {
    window.location.replace(data);

  }
})

console.log('hehehehehehljasdhfjhasdjkfhklasfhfkjashdfkljhadslfh');
