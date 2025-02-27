/*
 * Copyright (c) 2024 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */

import {type ValidatorComponent} from "../internal/internal.mjs";

/**
 * Validates the state of an unknown value or a value that does not have a specialized validator.
 *
 * @typeParam T - the type of the value that is being validated
 */
type UnknownValidator<T> = ValidatorComponent<T>;

export type {UnknownValidator};