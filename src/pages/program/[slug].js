import React from "react";
import Title from "@/components/Title";
import axios from "../api/axios";
import ProgramLeft from "@/components/program/ProgramLeft";
import LineLimit from "@/components/program/LineLimit";
import ProgramLevel from "@/components/program/ProgramLevel";
import SecondaryLayout from "../layouts/SecondaryLayout";

export async function getServerSideProps(context) {
  try {
    const { params } = context;
    const { slug } = params;

    const program = await axios.get(`program/${slug}`);
    const programData = program.data.data;

    return {
      props: {
        program: programData,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        program: null,
      },
    };
  }
}

function DetailProgram({ program }) {
  console.log(program);

  return (
    <SecondaryLayout>
      <section>
        <div className="container py-24">
          <Title
            title={
              "<strong class='text-primary-100'>Programs</strong> That We Will Open"
            }
            subtitle={
              "Kami adalah lembaga intermediasi yang melakukan proses inkubasi terhadap peserta inkubasi (tenant)."
            }
            textColor={"text-gray-500"}
          />

          {program &&
            program.map((data, i) => (
              <>
                <ProgramLeft
                  key={i}
                  image={data.image}
                  logo={data.logo}
                  content={data.content}
                  url_register={data.url_register}
                  justify={(i + 1) % 2 === 0 ? true : false}
                />
                {program.length > 1 && <LineLimit />}
              </>
            ))}
        </div>
      </section>

      <section>
        <ProgramLevel />
      </section>
    </SecondaryLayout>
  );
}

export default DetailProgram;
