import { Button, For, Spinner } from "@chakra-ui/react";

import { Toaster, toaster } from "../components/ui/toaster";

const AboutPage = () => {
  return (
    <div className="mt-20">
      <Button display="flex" justifyContent="center" alignItems="center">
        <Spinner size="sm" color="red" />
        ABOUT
      </Button>
      <For each={["success", "error", "warning", "info"]}>
        {(type) => (
          <Button
            size="sm"
            variant="outline"
            key={type}
            onClick={() =>
              toaster.create({
                title: `Toast status is ${type}`,
                type: type,
              })
            }
          >
            {type}
          </Button>
        )}
      </For>
      <Toaster />
    </div>
  );
};

export default AboutPage;
