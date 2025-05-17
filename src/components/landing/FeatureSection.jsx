import { CheckCheck, Leaf, Users2, Award } from "lucide-react";

const features = [
  {
    icon: <Leaf className="h-8 w-8 text-green-600" />,
    title: "Trail Discovery",
    description: "Browse and filter trails by difficulty, location, and more.",
  },
  {
    icon: <Users2 className="h-8 w-8 text-green-600" />,
    title: "Group Hikes",
    description: "Create or join a hiking group and make new friends.",
  },
  {
    icon: <CheckCheck className="h-8 w-8 text-green-600" />,
    title: "Packing Checklist",
    description: "Never forget essential gear with personalized checklists.",
  },
  {
    icon: <Award className="h-8 w-8 text-green-600" />,
    title: "Achievements",
    description: "Track your progress and earn badges for completed hikes.",
  },
];

const HikeFeatures = () => {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Everything You Need For Your Hike
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md transition"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HikeFeatures;
