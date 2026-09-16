// ─── Shared Event Data ────────────────────────────────────────────────────────
import foodDrive from '../../assets/event_food_drive.jpg';
import schoolSupplies from '../../assets/event_school_supplies.jpg';
import healthCamp from '../../assets/event_health_camp.jpg';

export const eventsData = [
  {
    id: 1,
    title: 'Community Food Drive',
    category: 'Nutrition',
    images: [foodDrive, schoolSupplies, healthCamp],   // gallery slides
    thumbnail: foodDrive,
    description:
      'Providing nutritious meals and grocery bags for families struggling with food insecurity in Kallakurichi.',
    date: 'Oct 12, 2024',
    location: 'Kallakurichi, Tamil Nadu',
    beneficiaries: '250+ Families',
    volunteers: '80 Volunteers',
    donor: 'John Doe',
    donorInitials: 'JD',
    details:
      'Our Community Food Drive brought together over 80 volunteers who distributed fresh produce, grains, and packed meals to more than 250 families across Kallakurichi. Funded by generous donors, this initiative helped ease the burden on parents during school season. We plan to make this a quarterly event, expanding outreach to neighbouring villages. The event also included a nutrition awareness session conducted by local health workers, empowering families with knowledge on balanced diets and hygiene.',
  },
  {
    id: 2,
    title: 'School Supplies Giveaway',
    category: 'Education',
    images: [schoolSupplies, healthCamp, foodDrive],
    thumbnail: schoolSupplies,
    description:
      'Free backpacks, notebooks, and stationery distributed to children beginning the new academic year.',
    date: 'Nov 5, 2024',
    location: 'Kallakurichi, Tamil Nadu',
    beneficiaries: '320+ Children',
    volunteers: '45 Volunteers',
    donor: 'Jane Smith',
    donorInitials: 'JS',
    details:
      'Ahead of the new academic year, Speed Trust partnered with local businesses to procure and distribute school kits — including backpacks, notebooks, pens, and geometry sets — to over 320 children from underprivileged families. This programme ensures that no child misses school due to lack of basic supplies. Teachers from nearby schools also participated, helping identify students most in need and ensuring equitable distribution across all wards.',
  },
  {
    id: 3,
    title: 'Free Health Check-up Camp',
    category: 'Healthcare',
    images: [healthCamp, foodDrive, schoolSupplies],
    thumbnail: healthCamp,
    description:
      'Medical professionals offered free screenings, vaccinations, and health counselling for children.',
    date: 'Dec 20, 2024',
    location: 'Kallakurichi, Tamil Nadu',
    beneficiaries: '180+ Children',
    volunteers: '12 Doctors & Nurses',
    donor: 'Dr. Ramesh Kumar',
    donorInitials: 'RK',
    details:
      'In collaboration with a team of 12 volunteer doctors and nurses, Speed Trust hosted a free health camp at the community hall. Children received general check-ups, vision tests, dental screening, and necessary vaccinations. Medicines were distributed at no cost, and parents were counselled on nutrition and hygiene practices. A follow-up schedule was also provided to families requiring ongoing medical attention, ensuring continuity of care beyond the event.',
  },
];
