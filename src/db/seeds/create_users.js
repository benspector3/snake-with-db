/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {username: 'avery123'},
    {username: 'blake456'},
    {username: 'coco789'}
  ]);
  
  await knex('user_scores').del();
  await knex('user_scores').insert([
    {score: 10, user_id: 3, date: '4/20/2023'},
    {score: 20, user_id: 1, date: '4/20/2023'},
    {score: 30, user_id: 2, date: '4/20/2023'}
  ])

};
