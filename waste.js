const timetable = {
  monday: [
    {
      time: "09:00 - 10:00",
      subject: "Mathematics",
      faculty: "Dr. Sharma",
      room: "A-101",
    },
    {
      time: "10:00 - 11:00",
      subject: "Data Structures",
      faculty: "Prof. Mehta",
      room: "C-203",
    },
    {
      time: "11:15 - 12:15",
      subject: "Digital Electronics",
      faculty: "Dr. Verma",
      room: "B-110",
    },
    {
      time: "01:00 - 02:00",
      subject: "Operating Systems",
      faculty: "Prof. Iyer",
      room: "Lab-2",
    },
    {
      time: "02:00 - 03:00",
      subject: "Communication Skills",
      faculty: "Ms. Kapoor",
      room: "D-12",
    },
  ],
  tuesday: [
    {
      time: "09:00 - 10:00",
      subject: "Data Structures",
      faculty: "Prof. Mehta",
      room: "C-203",
    },
    {
      time: "10:00 - 11:00",
      subject: "Mathematics",
      faculty: "Dr. Sharma",
      room: "A-101",
    },
    {
      time: "11:15 - 12:15",
      subject: "Operating Systems",
      faculty: "Prof. Iyer",
      room: "Lab-2",
    },
    {
      time: "01:00 - 02:00",
      subject: "Web Development",
      faculty: "Mr. Arjun",
      room: "Lab-5",
    },
    {
      time: "02:00 - 03:00",
      subject: "Environmental Studies",
      faculty: "Ms. Rao",
      room: "E-08",
    },
  ],
  wednesday: [
    {
      time: "09:00 - 10:00",
      subject: "Digital Electronics",
      faculty: "Dr. Verma",
      room: "B-110",
    },
    {
      time: "10:00 - 11:00",
      subject: "Data Structures Lab",
      faculty: "Prof. Mehta",
      room: "Lab-3",
    },
    {
      time: "11:15 - 12:15",
      subject: "Mathematics",
      faculty: "Dr. Sharma",
      room: "A-101",
    },
    {
      time: "01:00 - 02:00",
      subject: "Web Development",
      faculty: "Mr. Arjun",
      room: "Lab-5",
    },
  ],
  thursday: [
    {
      time: "09:00 - 10:00",
      subject: "Operating Systems",
      faculty: "Prof. Iyer",
      room: "Lab-2",
    },
    {
      time: "10:00 - 11:00",
      subject: "Digital Electronics",
      faculty: "Dr. Verma",
      room: "B-110",
    },
    {
      time: "11:15 - 12:15",
      subject: "Communication Skills",
      faculty: "Ms. Kapoor",
      room: "D-12",
    },
    {
      time: "01:00 - 02:00",
      subject: "Data Structures",
      faculty: "Prof. Mehta",
      room: "C-203",
    },
  ],
  friday: [
    {
      time: "09:00 - 10:00",
      subject: "Mathematics",
      faculty: "Dr. Sharma",
      room: "A-101",
    },
    {
      time: "10:00 - 11:00",
      subject: "Web Development",
      faculty: "Mr. Arjun",
      room: "Lab-5",
    },
    {
      time: "11:15 - 12:15",
      subject: "Operating Systems",
      faculty: "Prof. Iyer",
      room: "Lab-2",
    },
    {
      time: "01:00 - 02:00",
      subject: "Environmental Studies",
      faculty: "Ms. Rao",
      room: "E-08",
    },
  ],
  saturday: [],
  sunday: [],
};

const updatedTimetable = Object.fromEntries(
  Object.entries(timetable).map(([day, lectures]) => [
    day,
    lectures.map(lecture => ({
      ...lecture,
      status: "absent",
    })),
  ])
);

console.log(updatedTimetable);
