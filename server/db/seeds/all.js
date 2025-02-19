export async function seed(knex) {
  const isProduction = process.env.NODE_ENV === 'production'

  await knex('tasks').del()
  await knex('tasks').insert([
    {
      title: 'return library books',
      details: '@panmure library',
      priority: 2,
      is_completed: false,
      created_at: isProduction ? 1737633900 * 1000 : 1737633900, // Convert to milliseconds in production
      updated_at: isProduction ? 1737633900 * 1000 : 1737633900,
    },
    {
      title: 'water plants',
      details: 'either in the morning or late afternoon',
      priority: 3,
      is_completed: false,
      created_at: isProduction ? 1737720300 * 1000 : 1737720300,
      updated_at: isProduction ? 1737720300 * 1000 : 1737720300,
    },
    {
      title: 'look up recipe for deviled eggs',
      details: 'need to make a tray for Severance watch party',
      priority: 1,
      is_completed: false,
      created_at: isProduction ? 1737727500 * 1000 : 1737727500,
      updated_at: isProduction ? 1737727500 * 1000 : 1737727500,
    },
    {
      title: 'finish creating portfolio',
      details: 'including deployment and mobile responsive',
      priority: 3,
      is_completed: true,
      created_at: isProduction ? 1737360300 * 1000 : 1737360300,
      updated_at: isProduction ? 1737360300 * 1000 : 1737360300,
    },
    {
      title: 'create playlist for mahjong party',
      details: '90s bangers only',
      priority: 2,
      is_completed: false,
      created_at: isProduction ? 1737633900 * 1000 : 1737633900,
      updated_at: isProduction ? 1737633900 * 1000 : 1737633900,
    },
  ])
}
