import { expect, test } from "vitest";
import {
    defaultParametersDomain,
    fixedDomain,
} from "../workbench/resources/js/actions/App/Http/Controllers/DomainController";
import { setUrlDefaults, setRoutePrefix } from "../workbench/resources/js/wayfinder";
import nested from "../workbench/resources/js/routes/nested";

test("it can generate urls without default parameters set", () => {
    expect(fixedDomain.url({ param: "foo" })).toBe(
        "//example.test/fixed-domain/foo",
    );
});

test("it can generate urls with default URL parameters set on backend and frontend", () => {
    setUrlDefaults({
        defaultDomain: "tim.macdonald",
    });

    expect(
        defaultParametersDomain.url({
            param: "foo",
        }),
    ).toBe("//tim.macdonald.au/default-parameters-domain/foo");
});

test("it can use prefix", () => {
    setRoutePrefix("sk");

    expect(nested.child().url).toBe("/sk/nested/controller/child");
});
test("it can generate urls with dynamic function-based default URL parameters", () => {
    let callCount = 0;

    setUrlDefaults(() => {
        callCount++;
        return {
            defaultDomain: `dynamic-${callCount}.test`,
        };
    });

    expect(
        defaultParametersDomain.url({
            param: "foo",
        }),
    ).toBe("//dynamic-1.test.au/default-parameters-domain/foo");

    expect(
        defaultParametersDomain.url({
            param: "bar",
        }),
    ).toBe("//dynamic-2.test.au/default-parameters-domain/bar");

    expect(callCount).toBe(2);
});
