module Utils exposing (..)

import Array exposing (Array)
import Debug exposing (toString, todo)
import Process
import Random
import Task


type alias Second =
    Float


delay : Second -> msg -> Cmd msg
delay sec msg =
    Process.sleep sec
        |> Task.perform (always msg)


oneOf : List a -> Random.Generator a
oneOf xs =
    oneOfArray (Array.fromList xs)


oneOfArray : Array a -> Random.Generator a
oneOfArray xs =
    Random.map
        (\x ->
            case Array.get x xs of
                Just value ->
                    value

                Nothing ->
                    todo ("Could not find element " ++ toString x ++ " in array " ++ toString xs)
        )
        (Random.int 0 (Array.length xs - 1))


randomSeq : Int -> a -> Random.Generator (Array a)
randomSeq length a =
    Random.map Array.fromList (Random.list length (oneOf [ a ]))
