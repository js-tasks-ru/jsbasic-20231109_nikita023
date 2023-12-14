function makeFriendsList(friends) {
  const ulEl = document.createElement('ul');
  
  for (i = 0; i < friends.length; i++) {
    const liEl = document.createElement('li');
    liEl.innerText = `${friends[i].firstName} ${friends[i].lastName}`;
    ulEl.appendChild(liEl);
  }
  return ulEl;
}
