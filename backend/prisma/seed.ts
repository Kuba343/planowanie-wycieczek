import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Dodanie słownika kategorii
  const gory = await prisma.tripCategory.upsert({
    where: { name: 'Góry i aktywny wypoczynek' },
    update: {},
    create: { name: 'Góry i aktywny wypoczynek' },
  });

  const zwiedzanie = await prisma.tripCategory.upsert({
    where: { name: 'Zwiedzanie' },
    update: {},
    create: { name: 'Zwiedzanie' },
  });

  const odpoczynek = await prisma.tripCategory.upsert({
    where: { name: 'Odpoczynek nad wodą' },
    update: {},
    create: { name: 'Odpoczynek nad wodą' },
  });

  // 2. Dodanie przykładowych szablonów wycieczek z dniami i aktywnościami (JSONB)
  const existingTemplates = await prisma.tripTemplate.count();
  if (existingTemplates === 0) {
    await prisma.tripTemplate.create({
      data: {
        name: 'Weekend w Bieszczadach',
        description: 'Trzydniowy wypad na połoniny dla miłośników górskich wędrówek i wieczornych ognisk.',
        destination: 'Wetlina / Bieszczady',
        targetGroup: 'Studenci i początkujący turyści',
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
        categoryId: gory.id,
        days: {
          create: [
            {
              dayNumber: 1,
              title: 'Przyjazd i wejście na Połoninę Wetlińską',
              activities: [
                {
                  title: 'Zakwaterowanie i odprawa',
                  location: 'Wetlina',
                  description: 'Zostawienie bagaży i wspólne śniadanie.',
                  estimatedDurationMinutes: 60,
                },
                {
                  title: 'Szlak na Chatkę Puchatka',
                  location: 'Przełęcz Wyżna',
                  description: 'Wejście żółtym szlakiem i podziwianie panoramy.',
                  estimatedDurationMinutes: 240,
                },
              ],
            },
            {
              dayNumber: 2,
              title: 'Tarnica – najwyższy szczyt polskich Bieszczadów',
              activities: [
                {
                  title: 'Wyjście z Wołosatego',
                  location: 'Wołosate',
                  description: 'Podejście niebieskim szlakiem na Tarnicę (1346 m n.p.m.).',
                  estimatedDurationMinutes: 300,
                },
                {
                  title: 'Wspólne ognisko integracyjne',
                  location: 'Baza noclegowa',
                  description: 'Kolacja i podsumowanie wyjazdu.',
                  estimatedDurationMinutes: 180,
                },
              ],
            },
          ],
        },
      },
    });

    await prisma.tripTemplate.create({
      data: {
        name: 'Odkrywanie Krakowa',
        description: 'Intensywne zwiedzanie zabytków, muzeów i najlepszych miejsc gastronomicznych Krakowa.',
        destination: 'Kraków',
        targetGroup: 'Grupy znajomych',
        imageUrl: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1000&q=80',
        categoryId: zwiedzanie.id,
        days: {
          create: [
            {
              dayNumber: 1,
              title: 'Stare Miasto i Wawel',
              activities: [
                {
                  title: 'Spacer Traktem Królewskim',
                  location: 'Rynek Główny',
                  description: 'Sukiennice, Kościół Mariacki i Brama Floriańska.',
                  estimatedDurationMinutes: 150,
                },
                {
                  title: 'Zwiedzanie Wzgórza Wawelskiego',
                  location: 'Wawel',
                  description: 'Dziedziniec arkadowy, Katedra i Smocza Jama.',
                  estimatedDurationMinutes: 180,
                },
              ],
            },
          ],
        },
      },
    });
  }

  console.log('Seed bazy danych zakończony sukcesem!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });