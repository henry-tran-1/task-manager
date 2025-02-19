export async function seed(knex) {
  await knex('tasks').del()
  await knex('tasks').insert([
    {
      title: 'return library books',
      details: '@panmure library',
      priority: 2,
      is_completed: false,
      created_at: new Date(1737633900 * 1000), // Convert Unix timestamp to Date object
      updated_at: new Date(1737633900 * 1000),
    },
    {
      title: 'water plants',
      details: 'either in the morning or late afternoon',
      priority: 3,
      is_completed: false,
      created_at: new Date(1737720300 * 1000),
      updated_at: new Date(1737720300 * 1000),
    },
    {
      title: 'look up recipe for deviled eggs',
      details: 'need to make a tray for Severance watch party',
      priority: 1,
      is_completed: false,
      created_at: new Date(1737727500 * 1000),
      updated_at: new Date(1737727500 * 1000),
    },
    {
      title: 'finish creating portfolio',
      details: 'including deployment and mobile responsive',
      priority: 3,
      is_completed: true,
      created_at: new Date(1737360300 * 1000),
      updated_at: new Date(1737360300 * 1000),
    },
    {
      title: 'create playlist for mahjong party',
      details: '90s bangers only',
      priority: 2,
      is_completed: false,
      created_at: new Date(1737633900 * 1000),
      updated_at: new Date(1737633900 * 1000),
    },
  ])
}
