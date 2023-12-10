function showSalary(users, age) {
  let usersFilter = users.filter( (user) => user.age <= age );
  let usersMap = usersFilter.map( (user) => user.name + ", " + user.balance );
  return usersMap.join("\n");
}
