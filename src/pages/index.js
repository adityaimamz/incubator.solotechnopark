import Image from "next/image";
import Hero from "@/components/Hero";
import Title from "@/components/Title";
import IconTraining from "@/images/training.svg";
import IconResearch from "@/images/research.svg";
import IconMarketing from "@/images/marketing.svg";
import IconLegality from "@/images/legality.svg";
import IconBusiness from "@/images/busines-matching.svg";
// import ImageFacilities from "@/images/incubator-bisnis-STP-min-768x432.jpeg";
import ImageFacilities from "@/images/facilities_inkubator_solot_technopark.jpg";
import MentorSwiper from "@/components/swiper/MentorSwiper";
import TeamSwiper from "@/components/swiper/TeamSwiper";
import TenantSwiper from "@/components/swiper/TenantSwiper";
import Mitra from "@/components/Mitra";
import Events from "@/components/Events";
import Products from "@/components/Products";
import Button from "@/components/Button";
import ToTop from "@/components/ToTop";
import News from "@/components/News";
import DefaultLayout from "./layouts";
import { useEffect } from "react";
import Aos from "aos";
import LoadingError from "@/components/LoadingError";
import axios from "./api/axios";
import Program from "@/components/Program";

const facilities = [
  {
    title: "Training for Startup & SMESs (Incubator Section)",
    desc: "Capacity Building through Entrepreneurship Training for Business Incubators for Beginners in Business Development.",
    icon: IconTraining,
  },
  {
    title: "Research & Development",
    desc: "We are tasked with facilitating research and development of innovative and quality products, from identifying market needs to launching.",
    icon: IconResearch,
  },
  {
    title: "Ecosystem",
    desc: "Increasing Brand Awareness through a Sustainable Marketing Strategy with a Multichannel Approach.",
    icon: IconMarketing,
  },
  {
    title: "Legality",
    desc: "Increasing Legal Compliance through Risk Management and Protection of Intellectual Property Rights to Secure Business and Prepare for Business Legality Audits.",
    icon: IconLegality,
  },
  {
    title: "Business Matching",
    desc: "Maximizing opportunities for business growth and expansion through strategic partnerships and targeted networking initiatives.",
    icon: IconBusiness,
  },
];

export async function getServerSideProps() {
  try {
    const [
      tagline,
      program,
      mentor,
      team,
      tenant,
      category,
      communityOffline,
      communityOnline,
      news,
      event,
      partner,
      about,
    ] = await Promise.all([
      axios.get("content/tagline"),
      axios.get("program/all"),
      axios.get("mentor"),
      axios.get("team"),
      axios.get("tenant/all?limit=10"),
      axios.get("category"),
      axios.get("community?status=offline"),
      axios.get("community?status=online"),
      axios.get("news/all?limit=3"),
      axios.get("event/all?limit=4"),
      axios.get("partner"),
      axios.get("about"),
    ]);

    return {
      props: {
        taglineData: tagline.data.data,
        programData: program.data.data,
        mentorData: mentor.data.data,
        teamData: team.data.data,
        tenantData: tenant.data.data,
        facilitiesData: facilities,
        categoryData: category.data.data,
        communityDataOffline: communityOffline.data.data,
        communityDataOnline: communityOnline.data.data,
        newsData: news.data.data,
        eventData: event.data.data,
        partnerData: partner.data.data,
        aboutData: about.data.data,
      },
    };
  } catch (error) {
    return {
      props: {
        taglineData: null,
        programData: null,
        mentorData: null,
        teamData: null,
        tenantData: null,
        facilitiesData: null,
        categoryData: null,
        communityDataOffline: null,
        communityDataOnline: null,
        newsData: null,
        eventData: null,
        partnerData: null,
        aboutData: null,
      },
    };
  }
}

export default function Home({
  taglineData,
  programData,
  mentorData,
  teamData,
  tenantData,
  facilitiesData,
  categoryData,
  communityDataOffline,
  communityDataOnline,
  newsData,
  eventData,
  partnerData,
  aboutData,
}) {
  useEffect(() => {
    Aos.init({
      offset: 0,
    });
  }, []);

  return (
    <DefaultLayout>
      {taglineData ? (
        <>
          <section className="bg-primary-100" id="Home">
            <div className="bg-hero bg-no-repeat bg-cover">
              <Hero
                title={taglineData.hero.title}
                subtitle={taglineData.hero.subtitle}
                link={taglineData.hero.link}
              />
            </div>
          </section>

          <section>
            <div className="container py-24" id="About">
              {/* <div className="lg:h-[90vh] grid grid-cols-1 content-center"> */}
              <Title title={taglineData.about.title} />

              <div className="about mt-16 grid grid-cols-1 lg:grid-cols-2">
                {aboutData.map((data, i) => (
                  <div
                    key={i}
                    className={`${
                      (i + 1) % 2 == 0 ? "lg:border-l lg:pl-24" : "lg:pr-24"
                    }`}
                  >
                    <h2
                      className="head-4 my-7 mb-5 mx-auto capitalize"
                      dangerouslySetInnerHTML={{ __html: data.title }}
                    />
                    <div dangerouslySetInnerHTML={{ __html: data.content }} />
                  </div>
                ))}
              </div>
              {/* </div> */}
            </div>
          </section>

          <section
            className="bg-primary-100 bg-gradient-patern bg-gradient-to-tl  text-white"
            // style={{ backgroundPosition: "right top, left bottom" }}
            id="Program"
          >
            <div className="container py-24">
              <Title
                title={taglineData.program.title}
                subtitle={taglineData.program.subtitle}
                textColor={"text-white"}
              />

              <Program data={programData} />
            </div>
          </section>

          <section>
            <div className="py-24">
              <Title
                title={taglineData.facilities.title}
                subtitle={taglineData.facilities.subtitle}
                textColor={"text-gray-500"}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-20">
                <div className="bg-gray-100 mx-5 lg:mx-0 rounded-lg overflow-hidden lg:rounded-r-xl">
                  <Image
                    className="object-cover w-full h-full"
                    src={ImageFacilities}
                    alt="facilites image"
                  />
                </div>
                <div className="mx-5 lg:mr-52">
                  <ul data-aos="fade-up">
                    {facilitiesData.map((data, i) => (
                      <li
                        key={i}
                        className={`flex gap-5 ${
                          facilities.length === i + 1 ? "" : "mb-8"
                        }`}
                      >
                        <Image
                          className="w-12 h-12"
                          src={data.icon}
                          alt="icon"
                        />
                        <div>
                          <h3 className="head-4">{data.title}</h3>
                          <p className="my-5 text-gray-600">{data.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section
            id="Event"
            className="bg-primary-100 text-white bg-gradient-patern"
          >
            <div className="container py-24">
              <Title
                title={taglineData.event.title}
                subtitle={taglineData.event.subtitle}
                textColor={"text-white"}
              />

              <Events data={eventData} />
            </div>
          </section>

          <section id="Mentor">
            <div className="container py-24">
              <Title
                title={taglineData.mentor.title}
                subtitle={taglineData.mentor.subtitle}
              />

              <div>
                <MentorSwiper data={mentorData} />
              </div>
            </div>
          </section>

          <section className="bg-primary-100 bg-gradient-patern text-white">
            <div className="container py-24">
              <Title
                title={taglineData.team.title}
                subtitle={taglineData.team.subtitle}
                textColor={"text-white"}
              />

              <div>
                <TeamSwiper data={teamData} />
              </div>
            </div>
          </section>

          <section id="Partner">
            <div className="container py-24">
              <Title
                title={taglineData.partner.title}
                subtitle={taglineData.partner.subtitle}
                // textColor={"text-white"}
              />

              <Mitra data={partnerData} />
            </div>
          </section>

          <section
            className="bg-primary-100 bg-gradient-patern text-white"
            id="Tenant"
          >
            <div className="container py-24">
              <Title
                title={taglineData.tenant.title}
                subtitle={taglineData.tenant.subtitle}
                textColor={"text-white"}
              />

              <TenantSwiper className={"text-white"} data={tenantData} />

              <div className="flex justify-center items-center mt-20">
                <Button
                  className={"bg-secondary-200 text-primary-100 inline-block"}
                  title={"Read More"}
                  path="/tenant"
                />
              </div>
            </div>
          </section>

          <section id="Product">
            <div className="container py-24">
              <Title
                title={taglineData.product.title}
                subtitle={taglineData.product.subtitle}
              />
              <Products data={categoryData} />
              <div className="flex justify-center items-center mt-20">
                <Button
                  className={"bg-primary-100 text-white inline-block"}
                  title={"Read More"}
                  path="/product"
                />
              </div>
            </div>
          </section>

          <section
            className="bg-primary-100 bg-gradient-patern text-white"
            id="Community"
          >
            <div className="container pt-24">
              <Title
                title={taglineData.community.title}
                subtitle={taglineData.community.subtitle}
                textColor={"text-white"}
              />

              <TenantSwiper data={communityDataOffline} />
            </div>

            <div className="container pt-16 pb-24">
              <Title
                title={"Group " + taglineData.community.title}
                subtitle={taglineData.community.subtitle}
                textColor={"text-white"}
              />

              <TenantSwiper data={communityDataOnline} />
            </div>
          </section>

          <section id="Article">
            <div className="container py-24">
              <Title
                title={taglineData.news.title}
                subtitle={taglineData.news.subtitle}
              />

              <News data={newsData} />

              <div className="flex justify-center items-center mt-20">
                <Button
                  className={"bg-primary-100 text-white inline-block"}
                  title={"Read More"}
                  path="/news"
                />
              </div>
            </div>
          </section>

          <ToTop />
        </>
      ) : (
        <LoadingError />
      )}
    </DefaultLayout>
  );
}
